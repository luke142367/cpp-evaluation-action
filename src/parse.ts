import { Conclusion, AnnotationLevel } from '../@types/check'
import { ChecksUpdateParamsOutputAnnotations } from '@octokit/rest'

export { getAnnotations }

function getAnnotations(output: string): ChecksUpdateParamsOutputAnnotations[] {
    const { validation, quality } = JSON.parse(output)

    const annotations: ChecksUpdateParamsOutputAnnotations[] = []

    validation.runners.map((runner: any) => {
        runner.errors.map((error: any) => {
            const { info, file_path, details, line_number } = error

            const lineNumber = parseInt(line_number, 10)

            annotations.push({
                title: "Compilation Error",
                message: details,
                path: file_path,
                start_line: lineNumber,
                end_line: lineNumber,
                annotation_level: 'failure'
            })
        })
    })

    // Only add linting errors if there were no compilation errors:
    if (annotations.length > 0) {
        return annotations
    }

    const linter = quality.runners.find((r: any) => r.runner_key === 'clang-tidy')
    if (linter === undefined) {
        return annotations
    }

    linter.runners.map((runner: any) => {
        runner.errors.map((error: any) => {
            const { info, file_path, line_number } = error

            const lineNumber = parseInt(line_number, 10)

            annotations.push({
                title: "Linter Warning",
                message: info,
                path: file_path,
                start_line: lineNumber,
                end_line: lineNumber,
                annotation_level: 'warning'
            })
        })
    })

    return annotations
}

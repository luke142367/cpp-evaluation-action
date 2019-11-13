import { Conclusion, AnnotationLevel } from '../@types/check'
import { ChecksUpdateParamsOutputAnnotations } from '@octokit/rest'

export { getAnnotations }

function getAnnotations(output: string): ChecksUpdateParamsOutputAnnotations[] {
    const { validation } = JSON.parse(output)

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

    return annotations
}

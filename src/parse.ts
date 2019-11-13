import { ParsedSparkResult, ValidationError } from '../@types/cpp-spark'

export { parseSparkOutput }

function parseSparkOutput(output: string): ParsedSparkResult {
    const { validation } = JSON.parse(output)
    console.log(validation)

    const validationErrors: ValidationError[] = []
    validation.runners.map((runner: any) => {
        runner.errors.map((error: any) => {
            const { info, file_path, details, line_number } = error

            validationErrors.push({
                info: info,
                file_path: file_path,
                details: details,
                line_number: line_number
            })
        })
    })

    return {
        validationErrors: validationErrors
    }
}

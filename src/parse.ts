import { ValidationError } from '../@types/cpp-spark'

export { parseSparkOutput }

function parseSparkOutput(output: string): ParsedSparkResult {
    const { validation } = JSON.parse(output)
    console.log(validation)
}

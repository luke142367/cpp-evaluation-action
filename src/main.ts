import exec from './exec'
import { parseSparkOutput } from './parse'

function exitWithError(err: any) {
    console.error('Error', err.stack)

    if (err.data) {
        console.error(err.data)
    }

    process.exit(1)
}

async function run() {
    const { err, stdout, stderr } = await exec(`python /app/src/main.py --json-only .`)

    if (err != null) {
        exitWithError(err)
    }

    const { validationErrors } = parseSparkOutput(stdout)
    console.log(validationErrors)
}

run().catch(exitWithError);

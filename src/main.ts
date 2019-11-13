import exec from './exec'
import { getAnnotations } from './parse'
import { createCheck, updateCheck } from './check'

function exitWithError(err: any) {
    console.error('Error', err.stack)

    if (err.data) {
        console.error(err.data)
    }

    process.exit(1)
}

async function run() {
    //const id = await createCheck()
    const { err, stdout, stderr } = await exec(`python /app/src/main.py --json-only .`)

    if (err != null) {
        exitWithError(err)
    }

    const annotations = getAnnotations(stdout)
    console.log(annotations)
}

run().catch(exitWithError);

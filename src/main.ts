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
    const id = await createCheck()

    const { err, stdout, stderr } = await exec(`python /app/src/main.py --json-only .`)

    if (err != null) {
        exitWithError(err)
    }

    const annotations = getAnnotations(stdout)
    const failures = annotations.filter(a => a.annotation_level === 'failure')
    const conclusion = failures.length > 0 ? 'failure' : 'success'

    const summary = `${annotations.length} issue(s) found`

    const checkResult = {
        title: "C++ Evaluator",
        summary: summary,
        annotations: annotations,
    }

    console.log(checkResult)

    await updateCheck(id, conclusion, checkResult)

    if (conclusion === 'failure') {
        process.exit(78)
    }
}

run().catch(exitWithError);

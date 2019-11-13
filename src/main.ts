import exec from './exec'

function exitWithError(err : any) {
    console.error('Error', err.stack)
    if (err.data) {
        console.error(err.data)
    }
    process.exit(1)
}

async function run() {
    try {
        const { err, stdout, stderr } = await exec(`python /app/src/main.py .`)
        console.log(err)
        console.log(stdout)
        console.log(stderr)
    } catch (err) {
        exitWithError(err)
    }
}

console.log("Running");
run().catch(exitWithError);

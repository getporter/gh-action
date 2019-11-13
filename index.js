const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache')
async function run() {
    try {
        const porterURL = "https://cdn.deislabs.io/porter/latest/install-linux.sh";
        console.log(`Downloading Porter from ${porterURL}`);
        const porterInstallPath = await tc.downloadTool(`${porterURL}`);
        await exec.exec(`chmod`, [`+x`, `${porterInstallPath}`]);
        await exec.exec(`bash`, [`-c`, `${porterInstallPath}`]);
        core.addPath("/home/runner/.porter");
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()

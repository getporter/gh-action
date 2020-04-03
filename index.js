const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache')
async function run() {
    try {
        let porterVersion = core.getInput("porter_version");
        const porterURL = `https://cdn.porter.sh/${porterVersion}/install-linux.sh`;
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

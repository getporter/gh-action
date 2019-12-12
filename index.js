const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const process = require("process");
async function run() {
    try {
        let os;
        switch (process.env.RUNNER_OS) {
            case "Windows":
                os = "windows"
                break;
            case "MacOS":
                os = "mac"
                break;
            case "Linux":
                os = "linux"
                break;
            default:
                throw `Unknown OS: ${process.env.RUNNER_OS}`;
        }

        const porterURL = `https://cdn.deislabs.io/porter/latest/install-${os}.sh`;
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

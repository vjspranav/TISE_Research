const {Octokit} = require("@octokit/rest");
const fs = require("fs");
const path = require("path");

const TOKEN='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'
const REPO = 'https://github.com/pyodide/pyodide'

const octokit = new Octokit({
    auth: TOKEN
});

const issues  = []
let page = 0;

const getAllData = async () => {
    while (true) {
        const {data} = await octokit.request('GET /repos/{owner}/{repo}/issues', {
            owner: 'pyodide',
            repo: 'pyodide',
            state: 'all', // ['all', 'open', 'closed']
            per_page: 100,
            page: page
        });
        console.log('page: ', page, data.length)
        if (data.length <= 0) {
            issues.push(...data);
            break;
        }
        issues.push(...data);
        page++;
    }
}

getAllData().then(() => {
    const issuesJson = JSON.stringify(issues, null, 2);
    fs.writeFileSync(path.join(__dirname, 'issues.json'), issuesJson);
});


const fs = require('fs');
const fetch = require('node-fetch');
const core = require('@actions/core');
const exec = require('child_process').exec;

let rawdata = fs.readFileSync(core.getInput('path'));
let packages = JSON.parse(rawdata).Packages;

var cran_packages = [];

for (let key in packages) {
    // only keep CRAN packages
    if (packages[key].Source == 'Repository') {
        cran_packages.push(key);
    }
}

core.info(`Found ${cran_packages.length} CRAN packages in renv.lock: \n ${cran_packages.join('\n')}`)

var req = cran_packages.join('&pkgname=');

async function fetchDependencies() {
    const response = await fetch('https://packagemanager.rstudio.com/__api__/repos/1/sysreqs?all=false&pkgname=' + req + '&distribution=ubuntu&release=20.04');
    const dependencies = await response.json()
    return dependencies
}

fetchDependencies().then(dependencies => {
    var dependencies_string = [];

    for (let key in dependencies.requirements) {
        dependencies_string.push(dependencies.requirements[key].requirements.packages)
    }
    // remove duplicates
    let unique_dependencies =  [... new Set(dependencies_string.flat())].join(' ');
    exec('sudo apt-get install -y ' + unique_dependencies, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
    });
});
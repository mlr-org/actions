
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

console.log(cran_packages);

var req = cran_packages.join('&pkgname=');

async function fetchDependencies() {
    const response = await fetch('https://packagemanager.rstudio.com/__api__/repos/1/sysreqs?all=false&pkgname=' + req + '&distribution=ubuntu&release=20.04');
    const dependencies = await response.json()
    return dependencies
}

fetchDependencies().then(dependencies => {
    var install_script = [];

    for (let key in dependencies.requirements) {
        install_script.push(dependencies.requirements[key].requirements.packages)
    }
    // remove duplicates
    var script = 'sudo apt-get install -y ' + [... new Set(install_script.flat())].join(' ');
    exec(script);
  });

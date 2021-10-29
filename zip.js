const { zip } = require("zip-a-folder");
const fs = require("fs");

const packageJson = require("./package.json");
const version = packageJson.version;

const templateName = "expreessi";
const buildsFolder = "builds";
const distFolder = "dist";

if (!fs.existsSync(buildsFolder)) {
    fs.mkdirSync(buildsFolder);
}

zip(distFolder, `${buildsFolder}/${templateName}-${version}.zip`);

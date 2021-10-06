const { zip } = require("zip-a-folder");

const packageJson = require("./package.json");
const version = packageJson.version;

const templateName = "expreessi";
const buildsFolder = "builds";
const distFolder = "dist";

zip(distFolder, `${buildsFolder}/${templateName}-${version}.zip`);

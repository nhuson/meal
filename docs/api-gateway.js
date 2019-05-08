const fs = require("fs");

function getFileData(pathFile) {
  const dataFile = fs.readFileSync(pathFile, "utf8");
  return JSON.parse(dataFile.toString());
}

function writeFileData(path, data) {
  return fs.writeFileSync(path, JSON.stringify(data));
}

((rDir, wDir) => {
  const fileNames = fs.readdirSync(rDir);
  let dataPath = {};
  let dataDefinition = {};
  fileNames.forEach(filename => {
    const dataFile = getFileData(`${rDir}/${filename}`);
    dataPath = {
      ...dataPath,
      ...dataFile.path
    };
    dataDefinition = {
      ...dataDefinition,
      ...dataFile.definitions
    };
  });
  let template = {
    swagger: "2.0",
    info: {
      version: "1.0.0",
      title: "Meal Plan"
    },
    schemes: ["https", "http"]
  };
  template.paths = dataPath;
  template.definitions = dataDefinition;
  try {
    const wData = writeFileData(`${wDir}/api-gateway.json`, template);
  } catch (err) {
    console.log(err);
  }
})("./api-gateway", ".");

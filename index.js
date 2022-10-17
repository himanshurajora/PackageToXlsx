const xlsx = require("json-as-xlsx");
const path = require("path");
const _ = require("lodash");

const packageJsons = [
  {
    name: "Post Cal Electron App",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/app/package.json",
  },
  {
    name: "Post Cal Release Server",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/app-release-server/package.json",
  },
  {
    name: "Post Cal Server",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/server/package.json",
  },
  {
    name: "Post Cal Webapp",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/webapp/package.json",
  },
  {
    name: "Post Cal Image Generator",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/image-generator/package.json",
  },
  {
    name: "Post Cal Instruction Creator",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/instruction-creator/package.json",
  },
  {
    name: "Post Cal Pdf Generator",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/pdf-generator/package.json",
  },
  {
    name: "Post Cal Task Executor",
    path: "C:/Users/himan/Desktop/Files/Wisflux/bosch-alma-post-calibration/packages/task-executor/package.json",
  },
  {
    name: "Alma Server",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/server/package.json",
  },
  {
    name: "Alma Webapp",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/webapp/package.json",
  },
  {
    name: "Alma App Release Server",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/app-release-server/package.json",
  },
  {
    name: "Alma Electron App",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/app/package.json",
  },
  {
    name: "Alma Pdf Generator",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/pdf-generator/package.json",
  },
  {
    name: "Alma Task Executor",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma/packages/task-executor/package.json",
  },
  {
    name: "Barcode Scanner Proxy",
    path: "C:/Users/himan/Desktop/Files/Wisflux/alma-barcode-client/package.json",
  },
];

const data = [];

const multiSheet = false;

if (multiSheet) {
  packageJsons.forEach((packageJson, index) => {
    const packages = require(packageJson.path);
    data.push({
      sheet: packageJson.name,
      columns: [
        {
          label: "S.N.",
          value: "sn",
        },
        {
          label: "Name",
          value: "name",
        },
        {
          label: "Version",
          value: "version",
        },
        {
          label: "Url",
          value: "url",
        },
      ],
      content: [],
    });
    const array = [];
    let i = 1;
    _.forEach(
      _.merge(packages.dependencies, packages.devDependencies),
      (value, key) => {
        array.push({
          sn: i,
          name: key,
          version: value,
          url: `https://www.npmjs.com/package/${key}`,
        });
        i++;
      }
    );
    data[index].content = array;
  });
  xlsx(data);
} else {
  packageJsons.forEach((packageJson, index) => {
    const packages = require(packageJson.path);
    const array = [];
    let i = 1;
    _.forEach(
      _.merge(packages.dependencies, packages.devDependencies),
      (value, key) => {
        array.push({
          sn: i,
          name: key,
          version: value,
          url: `https://www.npmjs.com/package/${key}`,
        });
        i++;
      }
    );
    data.push({
      sheet: packageJson.name,
      columns: [
        {
          label: "S.N.",
          value: "sn",
        },
        {
          label: "Name",
          value: "name",
        },
        {
          label: "Version",
          value: "version",
        },
        {
          label: "Url",
          value: "url",
        },
      ],
      content: array,
    });
    xlsx(data, {
      fileName: packageJson.name,
    });
  });
}

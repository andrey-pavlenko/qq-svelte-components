/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');

if (process.argv.length < 3) {
  console.error('No json file in args');
  process.exit(-1);
}

const jsonFile = path.resolve(process.cwd(), process.argv[2]);
try {
  if (!fs.lstatSync(jsonFile).isFile()) {
    console.error(`${jsonFile} is not a file`);
    process.exit(-1);
  }
} catch (e) {
  console.error(e.toString());
  process.exit(-1);
}

try {
  const jsonContent = fs.readFileSync(jsonFile).toString('utf-8');
  const json = JSON.parse(jsonContent);
  let jsonStr = JSON.stringify(json);
  jsonStr = jsonStr.replace(/"/g, '&quot;');
  console.info(`"${jsonStr}"`);
  process.exit(0);
} catch (e) {
  console.error(e.toString());
  process.exit(-1);
}

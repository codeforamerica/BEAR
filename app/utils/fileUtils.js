import fs from 'fs';

export default function createJsonFile(jsonData, fileName) {
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, jsonString);
}

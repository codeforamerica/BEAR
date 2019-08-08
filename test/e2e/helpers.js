import fs from 'fs';

const path = require('path');

export function removeOutputDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function(entry) {
      const entryPath = path.join(dirPath, entry);
      if (fs.lstatSync(entryPath).isDirectory()) {
        fs.readdirSync(entryPath).forEach(function(subEntry) {
          const subEntryPath = path.join(entryPath, subEntry);
          fs.unlinkSync(subEntryPath);
        });
        fs.rmdirSync(entryPath);
      } else {
        fs.unlinkSync(entryPath);
      }
    });
    fs.rmdirSync(dirPath);
  }
}

export function getOutputDirectoryPath(dateTime) {
  return `${process.env.HOME}/Desktop/Clear_My_Record_output/CMR_output_${dateTime}`;
}

import fs from 'fs';
import { getDateTime } from '../../app/utils/fileUtils';

const path = require('path');

const baseOutputDirectory = `${process.env.HOME}/Desktop/Clear_My_Record_output/`;

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

export function getMostRecentlyCreatedOutputDirectoryTime() {
  const creationTimes = [];
  const outputDirectories = [];
  fs.readdir(baseOutputDirectory, (err, files) => {
    files.forEach(file => {
      if (file.startsWith('CMR_output_')) {
        outputDirectories.push(file);
      }
    });

    outputDirectories.forEach(file => {
      const timeCreated = fs
        .statSync(path.join(baseOutputDirectory, file))
        .mtime.getTime();

      creationTimes.push(Date.parse(timeCreated));
    });

    return creationTimes.sort()[-1];
  });
}

export function getOutputDirectoryPath() {
  const runTime = getMostRecentlyCreatedOutputDirectoryTime();
  return `${
    process.env.HOME
  }/Desktop/Clear_My_Record_output/CMR_output_${getDateTime(runTime)}`;
}

export function getEligibilityConfigFilePath() {
  const runTime = getMostRecentlyCreatedOutputDirectoryTime();
  return path.join(
    getOutputDirectoryPath(runTime),
    `eligibilityConfig_${getDateTime(runTime)}.json`
  );
}

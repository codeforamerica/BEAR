import fs from 'fs';

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

export function getOutputDirectoryPath() {
  const creationTimes = [];
  const fileNamesByCreationTime = {};
  const files = fs.readdirSync(baseOutputDirectory);

  files.forEach(file => {
    if (file.startsWith('CMR_output_')) {
      const timeString = fs.statSync(path.join(baseOutputDirectory, file));
      const timeCreated = timeString.mtime.getTime();
      creationTimes.push(timeCreated);
      fileNamesByCreationTime[timeCreated] = file;
    }
  });

  const fileTimestampsNewestToOldest = creationTimes.sort().reverse();
  const latestTime = fileTimestampsNewestToOldest[0];
  return `${process.env.HOME}/Desktop/Clear_My_Record_output/${fileNamesByCreationTime[latestTime]}`;
}

export function getMostRecentlyCreatedOutputDirectoryTimeString() {
  return getOutputDirectoryPath().split('CMR_output_')[1];
}

export function getEligibilityConfigFilePath() {
  return path.join(
    getOutputDirectoryPath(),
    `eligibilityConfig_${getMostRecentlyCreatedOutputDirectoryTimeString()}.json`
  );
}

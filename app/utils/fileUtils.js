// @flow
import fs from 'fs';

export function createJsonFile(
  jsonData: EligibilityConfiguration,
  fileName: string
) {
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, jsonString);
}

export function getDateTime(dateToConvert: Date) {
  const month = dateToConvert.getMonth() + 1;
  const day = dateToConvert.getDate();
  const year = dateToConvert.getFullYear();
  let hours = dateToConvert.getHours();
  const minutes = dateToConvert.getMinutes();
  const seconds = dateToConvert.getSeconds();
  let ampm = 'AM';

  if (hours >= 12) {
    if (hours > 12) hours -= 12;
    ampm = 'PM';
  }

  return `${twoDigitString(month)}_${twoDigitString(day)}_${twoDigitString(
    year
  )}_${twoDigitString(hours)}.${twoDigitString(minutes)}.${twoDigitString(
    seconds
  )}.${ampm}`;
}

function twoDigitString(int: number) {
  if (int < 10) {
    return `0${int}`;
  }
  return int.toString();
}

export function getFileSize(pathname: string) {
  return fs.statSync(pathname).size;
}

export function makeDirectory(pathToDirectory: string) {
  if (!fs.existsSync(pathToDirectory)) {
    fs.mkdirSync(pathToDirectory, { recursive: true });
  }
}

export function deleteDirectoryRecursive(directoryPath: string) {
  if (fs.existsSync(directoryPath)) {
    fs.readdirSync(directoryPath).forEach(file => {
      const curPath = `${directoryPath}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteDirectoryRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(directoryPath);
  }
}

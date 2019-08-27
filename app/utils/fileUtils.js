import fs from 'fs';

export function createJsonFile(jsonData, fileName) {
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, jsonString);
}

export function getDateTime(dateToConvert) {
  const month = dateToConvert.getMonth();
  const day = dateToConvert.getDate();
  const year = dateToConvert.getFullYear();
  let hours = dateToConvert.getHours();
  const minutes = dateToConvert.getMinutes();
  let ampm = 'AM';

  if (hours >= 12) {
    if (hours > 12) hours -= 12;
    ampm = 'PM';
  }

  return `${twoDigitString(month)}_${twoDigitString(day)}_${twoDigitString(
    year
  )}_${twoDigitString(hours)}.${twoDigitString(minutes)}.${ampm}`;
}

function twoDigitString(int) {
  if (int < 10) {
    return `0${int}`;
  }
  return int.toString();
}

export function getFileSize(pathname) {
  return fs.statSync(pathname).size;
}

import fs from 'fs';

export function createJsonFile(jsonData, fileName) {
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, jsonString);
}

export function getDateTime(date) {
  const months = [];
  months[0] = 'Jan';
  months[1] = 'Feb';
  months[2] = 'Mar';
  months[3] = 'Apr';
  months[4] = 'May';
  months[5] = 'Jun';
  months[6] = 'Jul';
  months[7] = 'Aug';
  months[8] = 'Sep';
  months[9] = 'Oct';
  months[10] = 'Nov';
  months[11] = 'Dec';

  const dateToConvert = date || new Date();
  const month = months[dateToConvert.getMonth()];
  const day = dateToConvert.getDate();
  const year = dateToConvert.getFullYear();
  let hours = dateToConvert.getHours();
  let minutes = dateToConvert.getMinutes();
  let seconds = dateToConvert.getSeconds();
  let ampm = 'AM';

  if (hours >= 12) {
    if (hours > 12) hours -= 12;
    ampm = 'PM';
  }

  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${month}_${day}_${year}_${hours}.${minutes}.${seconds}.${ampm}`;
}

export function getFileSize(pathname) {
  return fs.statSync(pathname).size;
}

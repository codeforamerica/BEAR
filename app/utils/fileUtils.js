import fs from 'fs';
import pdftk from 'node-pdftk';
import openFolder from './osHelpers';

export function createJsonFile(jsonData, fileName) {
  const jsonString = JSON.stringify(jsonData);
  fs.writeFileSync(fileName, jsonString);
}

export function getDateTime() {
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

  const now = new Date();
  const month = months[now.getMonth()];
  const day = now.getDate();
  const year = now.getFullYear();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
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

export function fillPDF(inputFilePath, outputPath, contentForFields) {
  if (fs.existsSync(inputFilePath)) {
    pdftk
      .input(inputFilePath)
      .fillForm(contentForFields)
      .flatten()
      .output(outputPath)
      .then(() => {
        openFolder(outputPath);
        return console.log('success');
      })
      .catch(err => {
        console.log('the following error occurred:', err);
      });
  } else {
    console.log('filepath does not exist', inputFilePath);
  }
}

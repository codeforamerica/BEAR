import path from 'path';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export

export function parseGogenOutput(outputFilePath, fileNameSuffix) {
  const pathToGogenOutput = path.join(
    outputFilePath,
    `gogen_${fileNameSuffix}.json`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  fs.unlinkSync(pathToGogenOutput);
  return JSON.parse(gogenOutputData);
}

export function formatCountsByCodeSection(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `H&S § ${entry[0]}: ${pluralize(entry[1])}`;
  });
  return countPhrases.join('; ');
}

export function formatCountsByAdditionalRelief(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `${entry[0]}: ${pluralize(entry[1])}`;
  });
  return countPhrases.join('; ');
}

export function formatDateTime() {
  const date = new Date();
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

export function toTitleCase(str) {
  return str.replace(/\w\S*/g, function(txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function pluralize(item) {
  if (item === 1) {
    return `1 conviction`;
  }
  return `${item} convictions`;
}

export function convertTimestamp(timestamp) {
  const monthNames = {
    1: 'January',
    2: 'February',
    3: 'March',
    4: 'April',
    5: 'May',
    6: 'June',
    7: 'July',
    8: 'August',
    9: 'September',
    10: 'October',
    11: 'November',
    12: 'December'
  };
  const dateArray = timestamp.split(' ')[0].split('-');
  const monthNumber = parseInt(dateArray[1], 10);
  const dayNumber = parseInt(dateArray[2], 10);
  return `${monthNames[monthNumber]} ${dayNumber}, ${dateArray[0]}`;
}
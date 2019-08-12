import path from 'path';
import fs from 'fs';

//eslint-disable-next-line import/prefer-default-export

export function parseGogenOutput(
  outputFilePath,
  fileNameSuffix
) {
  const pathToGogenOutput = path.join(
    outputFilePath,
    `gogen_${fileNameSuffix}.json`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  // fs.unlinkSync(pathToGogenOutput);
  return gogenOutputData;
}

export function formatCountsByCodeSection(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `H&S § ${entry[0]}: ${entry[1]} convictions`;
  });
  return countPhrases.join('; ');
}

export function formatCountsByAdditionalRelief(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `${entry[0]}: ${entry[1]} convictions`;
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

import path from 'path';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export function writeSummaryOutput(
  outputFilePath,
  filePathWithNumber,
  fileNameSuffix
) {
  const pathToGogenOutput = path.join(
    filePathWithNumber,
    `gogen_${fileNameSuffix}.out`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  fs.unlinkSync(pathToGogenOutput);
  const summaryOutputFilePath = path.join(outputFilePath, 'summaryOutput.txt');
  fs.appendFileSync(summaryOutputFilePath, gogenOutputData);
}

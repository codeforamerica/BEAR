/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import createJsonFile from './fileUtils';

export function transformEligibilityOptions(eligibilityOptions) {
  const jsonObject = { baselineEligibility: { dismiss: [], reduce: [] } };
  Object.keys(eligibilityOptions)
    .sort()
    .forEach(codeSection => {
      eligibilityOptions[codeSection] === 'dismiss'
        ? jsonObject.baselineEligibility.dismiss.push(codeSection.toUpperCase())
        : jsonObject.baselineEligibility.reduce.push(codeSection.toUpperCase());
    });
  return jsonObject;
}

export function runScript(state, spawnChildProcess) {
  const {
    gogenPath,
    county,
    dojFilePath,
    baselineEligibilityOptions,
    outputFilePath
  } = state;

  const formattedEligibilityOptions = transformEligibilityOptions(
    baselineEligibilityOptions
  );
  if (!fs.existsSync(outputFilePath)) {
    fs.mkdirSync(outputFilePath, { recursive: true });
  }
  const pathToEligibilityOptions = `${outputFilePath}${
    path.sep
  }eligibilityConfig.json`;
  createJsonFile(formattedEligibilityOptions, pathToEligibilityOptions);

  const countyCode = county.code;
  const goProcess = spawnChildProcess(gogenPath, [
    `run`,
    `--input-doj=${dojFilePath}`,
    `--outputs=${outputFilePath}`,
    `--county=${countyCode}`,
    `--eligibility-options=${pathToEligibilityOptions}`
  ]);

  goProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
  });

  goProcess.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });

  goProcess.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });
}

/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import createJsonFile from './fileUtils';

export function transformEligibilityOptions(state) {
  const jsonObject = { dismiss: [], reduce: [] };
  Object.values(state).forEach(value => {
    value.option === 'dismiss'
      ? jsonObject.dismiss.push(value.codeSection.toUpperCase())
      : jsonObject.reduce.push(value.codeSection.toUpperCase());
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
  fs.mkdirSync(outputFilePath, { recursive: true });
  const jsonPath = `${outputFilePath}${path.sep}eligibilityConfig.json`;
  createJsonFile(formattedEligibilityOptions, jsonPath);

  const countyCode = county.code;

  const goProcess = spawnChildProcess(gogenPath, [
    `--input-doj=${dojFilePath}`,
    `--outputs=${outputFilePath}`,
    `--county="${countyCode}"`,
    `--jsonPath=${jsonPath}`
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

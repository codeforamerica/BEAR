/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import React from 'react';

export function transformBaselineEligibilityOptions(eligibilityOptions) {
  const jsonObject = { baselineEligibility: { dismiss: [], reduce: [] } };
  Object.keys(eligibilityOptions)
    .sort()
    .forEach(codeSection => {
      eligibilityOptions[codeSection] === 'dismiss'
        ? jsonObject.baselineEligibility.dismiss.push(codeSection)
        : jsonObject.baselineEligibility.reduce.push(codeSection);
    });
  return jsonObject;
}

export function transformSubjectAgeThreshold(additionalReliefOptions) {
  if (additionalReliefOptions.dismissOlderThanAgeThreshold) {
    return {
      subjectAgeThreshold: additionalReliefOptions.subjectAgeThreshold
    };
  }
  return { subjectAgeThreshold: 0 };
}

export function transformYearsSinceConviction(additionalReliefOptions) {
  if (additionalReliefOptions.dismissYearsSinceConvictionThreshold) {
    return {
      yearsSinceConvictionThreshold:
      additionalReliefOptions.yearsSinceConvictionThreshold
    };
  }
  return { yearsSinceConvictionThreshold: 0 };
}

export function runScript(
  state,
  spawnChildProcess,
  createJsonFile,
  childFinishedCallback: function
) {
  const {
    gogenPath,
    dateTime,
    county,
    dojFilePath,
    baselineEligibilityOptions,
    additionalReliefOptions,
    outputFilePath
  } = state;

  if (!fs.existsSync(outputFilePath)) {
    fs.mkdirSync(outputFilePath, { recursive: true }, err => {
      if (err) throw err;
      console.log('error making path:', path);
    });
  }
  const JsonFileName = `eligibilityConfig_${dateTime}.json`;
  const pathToEligibilityOptions = path.join(outputFilePath, JsonFileName);

  const formattedEligibilityOptions = transformBaselineEligibilityOptions(
    baselineEligibilityOptions
  );

  const formattedAdditionalReliefOptions = {
    ...additionalReliefOptions,
    ...transformSubjectAgeThreshold(additionalReliefOptions),
    ...transformYearsSinceConviction(additionalReliefOptions)
  };

  const eligibilityLogicConfig = {
    ...formattedEligibilityOptions,
    additionalRelief: formattedAdditionalReliefOptions
  };

  createJsonFile(eligibilityLogicConfig, pathToEligibilityOptions);
  const countyCode = county.code;
  const goProcess = spawnChildProcess(gogenPath, [
    `run`,
    `--date-for-file-name=${dateTime}`,
    `--input-doj=${dojFilePath}`,
    `--outputs=${outputFilePath}`,
    `--county=${countyCode}`,
    `--eligibility-options=${pathToEligibilityOptions}`
  ]);
  // let reachedSummaryData = false;
  writeToFile('summaryOutput.txt', 'Summary Output: ');
  let numTimesCalled = 0;
  goProcess.stdout.on('data', data => {
    numTimesCalled++;
    const dataString = data.toString();
    console.log('stdout: ', dataString);
    fs.appendFileSync('summaryOutput.txt', data);
    console.log(`Called ${numTimesCalled} times`)
  });

  goProcess.on('close', childFinishedCallback);
  goProcess.on('error', error => {
    console.error(error);
    childFinishedCallback();
  });

  goProcess.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
}

// export function parseGogenOutput(data, outputFilePath, reachedSummaryData) {
//   const dataString = data.toString();
//   console.log('stdout: ', dataString);
//   console.log('this is the PATH', outputFilePath);
//   // const summaryOutputPath = path.join(outputFilePath, 'summaryOutput.txt');
//   const dataWeCareAbout = dataString.split('&&&&&&')[1];
//   if (dataWeCareAbout) {
//     this.setState({ reachedSummaryData: true });
//   }
//   console.log('reached Summary Data: ', reachedSummaryData);
//   if (reachedSummaryData) {
//     writeToFile('summaryOutput.txt', dataWeCareAbout);
//   }
// }

function writeToFile(filename, text) {
  fs.writeFileSync(filename, text, 'utf8');
}

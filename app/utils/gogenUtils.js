/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';

function transformBaselineEligibilityOptions(eligibilityOptions) {
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

function transformOptionalReliefValues(additionalReliefOptions) {
  const transformedOptions = {
    subjectAgeThreshold: 0,
    yearsSinceConvictionThreshold: 0,
    yearsCrimeFreeThreshold: 0
  };

  if (additionalReliefOptions.dismissOlderThanAgeThreshold) {
    transformedOptions.subjectAgeThreshold =
      additionalReliefOptions.subjectAgeThreshold;
  }

  if (additionalReliefOptions.dismissYearsSinceConvictionThreshold) {
    transformedOptions.yearsSinceConvictionThreshold =
      additionalReliefOptions.yearsSinceConvictionThreshold;
  }

  if (additionalReliefOptions.dismissYearsCrimeFreeThreshold) {
    transformedOptions.yearsCrimeFreeThreshold =
      additionalReliefOptions.yearsCrimeFreeThreshold;
  }

  return transformedOptions;
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
    ...transformOptionalReliefValues(additionalReliefOptions)
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

  goProcess.stdout.on('data', data => {
    console.log(data.toString());
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

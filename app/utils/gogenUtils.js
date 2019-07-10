/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';

export function transformBaselineEligibilityOptions(eligibilityOptions) {
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
  stdoutCallbackFunction
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

  goProcess.stdout.on('data', data => {
    stdoutCallbackFunction(data);
  });

  goProcess.on('close', code => {
    console.log(`child process exited with code ${code}`);
  });

  goProcess.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
}

export function getDataFromStdout(data) {
  console.log('stdout:', data.toString());
  return {
    individualsThatGotRelief: 'some people',
    numProp64DismissedOrReduced: 'some other num',
    numProp64MisdemeanorsDismissed: 'some misd',
    numProp64FeloniesDismissedOrReduced: 'some felonies',
    dismissedCodeSections: 'dismissed code sections',
    reducedCodeSections: 'reduced code sections',
    additionalReliefOptions: 'options, options, options',
    fullResultsFileName: 'full filename',
    fullResultsColumns: 'full columns',
    fullResultsRows: 'full rows',
    condensedResultsFileName: 'condensed filename',
    condensedResultsColumns: 'condensed columns',
    condensedResultsRows: 'condensed rows',
    convictionsResultsFileName: 'convictions filename',
    convictionsResultsColumns: 'convictions columns',
    convictionsResultsRows: 'convictions rows'
  };
}

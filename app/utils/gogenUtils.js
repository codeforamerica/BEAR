// @flow
/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import {
  createJsonFile,
  makeDirectory,
  deleteDirectoryRecursive
} from './fileUtils';
import { writeSummaryReport } from './writeSummaryOutputUtils';

function transformBaselineEligibilityOptions(
  eligibilityOptions: BaselineEligibilityOptions
) {
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

function transformOptionalReliefValues(
  additionalReliefOptions: AdditionalReliefOptions
) {
  const transformedOptions = {
    yearsSinceConvictionThreshold: 0,
    yearsCrimeFreeThreshold: 0
  };

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

function readGogenErrors(outputFilePath: string, fileNameSuffix: string) {
  const pathToErrors = path.join(outputFilePath, `gogen_${fileNameSuffix}.err`);
  return fs.readFileSync(pathToErrors, 'utf8');
}

function removeResultsDirectories(
  dojFilePaths: Array<string>,
  outputFilePath: string,
  fileNameSuffix: string
) {
  dojFilePaths.forEach((_, index) => {
    const resultDirectory = path.join(
      outputFilePath,
      `DOJ_Input_File_${index + 1}_Results_${fileNameSuffix}`
    );
    deleteDirectoryRecursive(resultDirectory);
  });
}

// eslint-disable-next-line import/prefer-default-export
export function runScript(
  state: ApplicationState,
  spawnChildProcess: function,
  onGogenComplete: function,
  updateImpactStatistics: function,
  preserveEligibilityConfig: boolean
) {
  const {
    gogenPath,
    formattedGogenRunTime,
    county,
    dojFilePaths,
    baselineEligibilityOptions,
    additionalReliefOptions,
    outputFilePath
  } = state;
  makeDirectory(outputFilePath);
  const JsonFileName = `eligibilityConfig_${formattedGogenRunTime}.json`;
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

  const fileNameSuffix = formattedGogenRunTime;

  const goProcess = spawnChildProcess(
    gogenPath,
    [
      `run`,
      `--file-name-suffix=${fileNameSuffix}`,
      `--input-doj=${dojFilePaths.join(',')}`,
      `--outputs=${outputFilePath}`,
      `--county=${countyCode}`,
      `--eligibility-options=${pathToEligibilityOptions}`,
      `--compute-at=2020-07-01`
    ],
    { stdio: 'ignore' }
  );

  goProcess.on('exit', code => {
    let errorText = '';
    if (code !== 0) {
      errorText = readGogenErrors(outputFilePath, fileNameSuffix);
      removeResultsDirectories(dojFilePaths, outputFilePath, fileNameSuffix);
    } else {
      const summaryData = parseGogenOutput(outputFilePath, fileNameSuffix);
      updateImpactStatistics(summaryData.reliefWithCurrentEligibilityChoices);
      writeSummaryReport(
        summaryData,
        outputFilePath,
        dojFilePaths,
        formattedEligibilityOptions,
        formattedGogenRunTime
      );
      if (!preserveEligibilityConfig) {
        fs.unlinkSync(pathToEligibilityOptions);
      }
    }
    onGogenComplete(code, errorText);
  });
}

function parseGogenOutput(outputFilePath: string, fileNameSuffix: string) {
  const pathToGogenOutput = path.join(
    outputFilePath,
    `gogen_${fileNameSuffix}.json`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  fs.unlinkSync(pathToGogenOutput);
  return JSON.parse(gogenOutputData);
}

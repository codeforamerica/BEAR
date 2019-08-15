/* eslint-disable no-unused-expressions */
import fs from 'fs';
import path from 'path';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import { createJsonFile } from './fileUtils';
import { parseGogenOutput } from './writeSummaryOutputUtils';
import SummaryReportPdf from '../components/SummaryReportPdf';

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

// eslint-disable-next-line import/prefer-default-export
export function runScript(
  state,
  spawnChildProcess,
  childFinishedCallback: function
) {
  const {
    gogenPath,
    dateTime,
    county,
    dojFilePaths,
    baselineEligibilityOptions,
    additionalReliefOptions,
    outputFilePath
  } = state;
  makeDirectory(outputFilePath);
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

  const fileNameSuffix = dateTime;

  const goProcess = spawnChildProcess(gogenPath, [
    `run`,
    `--file-name-suffix=${fileNameSuffix}`,
    `--input-doj=${dojFilePaths.join(',')}`,
    `--outputs=${outputFilePath}`,
    `--county=${countyCode}`,
    `--eligibility-options=${pathToEligibilityOptions}`,
    `--compute-at=2020-07-01`
  ]);
  goProcess.stdout.on('data', data => {
    const dataString = data.toString();
    console.log(`stdout for gogen process: `, dataString);
  });

  goProcess.on('close', () => {
    ReactPDF.render(
      <SummaryReportPdf
        summaryData={parseGogenOutput(outputFilePath, fileNameSuffix)}
        inputFileCount={dojFilePaths.length}
      />,
      path.join(outputFilePath, 'CMR_summary_report.pdf')
    );
    childFinishedCallback();
  });
  goProcess.on('error', error => {
    console.error(error);
    childFinishedCallback();
  });

  goProcess.stderr.on('data', data => {
    console.log(`stderr: ${data}`);
  });
}

function makeDirectory(pathToDirectory) {
  if (!fs.existsSync(pathToDirectory)) {
    fs.mkdirSync(pathToDirectory, { recursive: true }, err => {
      if (err) throw err;
      console.log('error making path:', path);
    });
  }
}

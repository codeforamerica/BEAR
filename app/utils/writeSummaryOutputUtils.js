import path from 'path';
import fs from 'fs';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import SummaryReportPdf from '../components/SummaryReportPdf';

export function writeSummaryReport(
  outputFilePath,
  fileNameSuffix,
  dojFilePaths,
  formattedEligibilityOptions,
  formattedGogenRunTime
) {
  ReactPDF.render(
    <SummaryReportPdf
      summaryData={parseGogenOutput(outputFilePath, fileNameSuffix)}
      inputFileCount={dojFilePaths.length}
      allEligibleConvictionsDismissed={allEligibleConvictionsDismissed(
        formattedEligibilityOptions
      )}
      formattedGogenRunTime={formattedGogenRunTime}
    />,
    path.join(outputFilePath, `Summary_Report_${formattedGogenRunTime}.pdf`)
  );
}

export function allEligibleConvictionsDismissed(transformedEligibilityOptions) {
  return transformedEligibilityOptions.baselineEligibility.reduce.length === 0;
}

function parseGogenOutput(outputFilePath, fileNameSuffix) {
  const pathToGogenOutput = path.join(
    outputFilePath,
    `gogen_${fileNameSuffix}.json`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  fs.unlinkSync(pathToGogenOutput);
  return JSON.parse(gogenOutputData);
}

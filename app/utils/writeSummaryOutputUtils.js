// @flow
import path from 'path';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import SummaryReportPdf from '../components/SummaryReportPdf';

export function writeSummaryReport(
  summaryData: GogenSummaryData,
  outputFilePath: string,
  dojFilePaths: Array<string>,
  formattedEligibilityOptions: BaselineEligibilityConfiguration,
  formattedGogenRunTime: string
) {
  ReactPDF.render(
    <SummaryReportPdf
      summaryData={summaryData}
      inputFileCount={dojFilePaths.length}
      allEligibleConvictionsDismissed={allEligibleConvictionsDismissed(
        formattedEligibilityOptions
      )}
      formattedGogenRunTime={formattedGogenRunTime}
    />,
    path.join(outputFilePath, `Summary_Report_${formattedGogenRunTime}.pdf`)
  );
}

export function allEligibleConvictionsDismissed(
  transformedEligibilityOptions: BaselineEligibilityConfiguration
) {
  return transformedEligibilityOptions.baselineEligibility.reduce.length === 0;
}

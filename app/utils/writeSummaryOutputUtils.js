import path from 'path';
import ReactPDF from '@react-pdf/renderer';
import React from 'react';
import SummaryReportPdf from '../components/SummaryReportPdf';

export function writeSummaryReport(
  summaryData,
  outputFilePath,
  dojFilePaths,
  formattedEligibilityOptions,
  formattedGogenRunTime
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

export function allEligibleConvictionsDismissed(transformedEligibilityOptions) {
  return transformedEligibilityOptions.baselineEligibility.reduce.length === 0;
}

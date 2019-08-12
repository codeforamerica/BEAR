import path from 'path';
import fs from 'fs';

// eslint-disable-next-line import/prefer-default-export
export function writeSummaryOutput(
  outputFilePath,
  fileNameSuffix,
  inputFileCount
) {
  const pathToGogenOutput = path.join(
    outputFilePath,
    `gogen_${fileNameSuffix}.json`
  );
  const gogenOutputData = fs.readFileSync(pathToGogenOutput, 'utf8');
  fs.unlinkSync(pathToGogenOutput);
  const summaryOutputFilePath = path.join(outputFilePath, 'summaryOutput.txt');
  fs.appendFileSync(
    summaryOutputFilePath,
    formatGogenOutput(gogenOutputData, inputFileCount)
  );
}

function formatGogenOutput(outputString, inputFileCount) {
  const summaryData = JSON.parse(outputString);
  const totalProp64Convictions =
    summaryData.prop64FelonyConvictionsCountInCounty +
    summaryData.prop64NonFelonyConvictionsCountInCounty;
  const content =
    `This report was generated by Clear My Record on ${formatDateTime()} for ${
      summaryData.county
    } County.\n` +
    `DOJ provided a spreadsheet with the entire CA criminal record history for every individual convicted of H&S § 11357, H&S § 11358, H&S § 11359, and/or H&S § 11360 in ${summaryData.county} County since ${summaryData.earliestConviction}.\n` +
    `Based on your office's eligibility choices, this application processed ${
      summaryData.lineCount
    } lines of data in ${
      summaryData.processingTimeInSeconds
    } seconds and produced ${inputFileCount *
      3} spreadsheets to assist with your office’s review.\n` +
    `Based on your eligibility choices:\n` +
    `${summaryData.reliefWithCurrentEligibilityChoices.CountSubjectsNoFelony} people will no longer have a felony on their CA record\n` +
    `${summaryData.reliefWithCurrentEligibilityChoices.CountSubjectsNoConvictionLast7Years} people will no longer have any conviction on their CA record in the last 7 years\n` +
    `${summaryData.reliefWithCurrentEligibilityChoices.CountSubjectsNoConviction} people will no longer have any conviction on their CA record\n` +
    `Additional summary data\n` +
    `# of people with Prop 64 conviction in ${summaryData.county} County: ${summaryData.subjectsWithProp64ConvictionCountInCounty}\n` +
    `# of Prop 64 convictions in ${summaryData.county} County: ${totalProp64Convictions}\n` +
    `${formatCountsByCodeSection(
      summaryData.prop64ConvictionsCountInCountyByCodeSection
    )}\n` +
    `For the above convictions, ${summaryData.prop64FelonyConvictionsCountInCounty} were felonies and ${summaryData.prop64NonFelonyConvictionsCountInCounty} were misdemeanors or infractions\n` +
    `${summaryData.county} County DA’s eligibility determinations for felonies under Prop 64\n` +
    `The following was the eligibility determination you chose\n` +
    `For felonies, dismissals based on code section: ${formatCountsByCodeSection(
      summaryData.convictionDismissalCountByCodeSection
    )}\n` +
    `Reductions: ${formatCountsByCodeSection(
      summaryData.convictionReductionCountByCodeSection
    )}\n` +
    `Dismissals based on additional relief: ${formatCountsByAdditionalRelief(
      summaryData.convictionDismissalCountByAdditionalRelief
    )}\n` +
    `${summaryData.subjectsWithSomeReliefCount} number of individuals will get some type of relief\n`;

  return content;
}

function formatCountsByCodeSection(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `H&S § ${entry[0]}: ${entry[1]} convictions`;
  });
  return countPhrases.join('; ');
}

function formatCountsByAdditionalRelief(convictionCounts) {
  const countPhrases = Object.entries(convictionCounts).map(entry => {
    return `${entry[0]}: ${entry[1]} convictions`;
  });
  return countPhrases.join('; ');
}

function formatDateTime() {
  const date = new Date();
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  });
}

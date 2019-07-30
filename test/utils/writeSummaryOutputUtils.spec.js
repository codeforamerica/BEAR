import fs from 'fs';
import path from 'path';
import { writeSummaryOutput } from '../../app/utils/writeSummaryOutputUtils';

describe('writeSummaryOutput', () => {
  const outputPath = '/tmp/';
  const numberedOutputPath = '/tmp/#1/';
  const fileNameSuffix = 'suffix';
  const pathToGogenOutput = path.join(numberedOutputPath, 'gogen_suffix.out');
  const pathToSummaryOutput = '/tmp/summaryOutput.txt';
  afterEach(() => {
    fs.unlinkSync('/tmp/summaryOutput.txt');
  });
  it('creates summaryOutput.txt with summary data and without the console progress bar', () => {
    fs.writeFileSync(pathToGogenOutput, '&&&&&& this is summary text');
    writeSummaryOutput(outputPath, numberedOutputPath, fileNameSuffix);

    const outputFromTmpFile = fs.readFileSync('/tmp/summaryOutput.txt', 'utf8');
    expect(outputFromTmpFile).toEqual('&&&&&& this is summary text');
  });

  it('can append data to summaryOutput.txt when it already has data in it', () => {
    fs.writeFileSync(
      pathToSummaryOutput,
      '&&&&&& this is the first output text'
    );
    fs.writeFileSync(
      pathToGogenOutput,
      '&&&&&& this is the second output text'
    );
    writeSummaryOutput(outputPath, numberedOutputPath, fileNameSuffix);

    const outputFromTmpFile = fs.readFileSync(pathToSummaryOutput, 'utf8');
    expect(outputFromTmpFile).toEqual(
      '&&&&&& this is the first output text&&&&&& this is the second output text'
    );
  });
});

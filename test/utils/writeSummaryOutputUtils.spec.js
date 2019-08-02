import fs from 'fs';
import { writeSummaryOutput } from '../../app/utils/writeSummaryOutputUtils';

jest.mock('fs');

describe('writeSummaryOutput', () => {
  const outputPath = '/tmp/';
  const numberedOutputPath = `${outputPath}/#1/`;

  it('creates summaryOutput.txt with summary data and without the console progress bar', () => {
    fs.__setFileContent('&&&&&& this is summary text');
    writeSummaryOutput(outputPath, numberedOutputPath, 'suffix');
    expect(fs.readFileSync.mock.calls.length).toEqual(1);
    expect(fs.readFileSync.mock.calls[0]).toEqual([
      '/tmp/#1/gogen_suffix.out',
      'utf8'
    ]);

    expect(fs.unlinkSync.mock.calls.length).toEqual(1);
    expect(fs.unlinkSync.mock.calls[0]).toEqual(['/tmp/#1/gogen_suffix.out']);

    expect(fs.appendFileSync.mock.calls.length).toEqual(1);
    expect(fs.appendFileSync.mock.calls[0]).toEqual([
      '/tmp/summaryOutput.txt',
      '&&&&&& this is summary text'
    ]);
  });
});

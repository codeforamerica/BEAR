import fs from 'fs';
import { writeSummaryOutput } from '../../app/utils/writeSummaryOutputUtils';

jest.mock('fs');

describe('writeSummaryOutput', () => {
  const outputPath = '/outputFolder_date/';
  const gogenOutputJson = {
    county: 'SACRAMENTO',
    earliestConviction: '1979-06-01T00:00:00Z',
    lineCount: 34,
    processingTimeInSeconds: 2.6,
    reliefWithCurrentEligibilityChoices: {
      CountSubjectsNoConviction: 2,
      CountSubjectsNoConvictionLast7Years: 2,
      CountSubjectsNoFelony: 3
    },
    reliefWithDismissAllProp64: {
      CountSubjectsNoConviction: 4,
      CountSubjectsNoConvictionLast7Years: 2,
      CountSubjectsNoFelony: 4
    },
    prop64ConvictionsCountInCountyByCodeSection: {
      '11357': 4,
      '11358': 7,
      '11359': 6
    },
    subjectsWithProp64ConvictionCountInCounty: 8,
    prop64FelonyConvictionsCountInCounty: 12,
    prop64MisdemeanorConvictionsCountInCounty: 4,
    subjectsWithSomeReliefCount: 8,
    convictionDismissalCountByCodeSection: {
      '11357(a)': 2,
      '11360': 2
    },
    convictionReductionCountByCodeSection: {
      '11357(b)': 5,
      '11359': 7
    },
    convictionDismissalCountByAdditionalRelief: {
      'Conviction occurred 5 or more years ago': 1,
      'No convictions in the past 1 years': 3,
      'Only has 11357-60 charges': 1
    }
  };

  beforeEach(() => {
    fs.__setFileContent(JSON.stringify(gogenOutputJson));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('creates summaryOutput.txt with summary data', () => {
    writeSummaryOutput(outputPath, 'date', 1);
    expect(fs.readFileSync.mock.calls.length).toEqual(1);
    expect(fs.readFileSync.mock.calls[0]).toEqual([
      '/outputFolder_date/gogen_date.json',
      'utf8'
    ]);

    expect(fs.unlinkSync.mock.calls.length).toEqual(1);
    expect(fs.unlinkSync.mock.calls[0]).toEqual([
      '/outputFolder_date/gogen_date.json'
    ]);

    expect(fs.appendFileSync.mock.calls.length).toEqual(1);
    expect(fs.appendFileSync.mock.calls[0][0]).toEqual(
      '/outputFolder_date/summaryOutput.txt'
    );
    expect(fs.appendFileSync.mock.calls[0][1]).toContain(
      '34 lines of data in 2.6 seconds'
    );
  });

  it('calculates number of spreadsheets produced based on number of input files provided', () => {
    writeSummaryOutput(outputPath, 'date', 4);
    expect(fs.appendFileSync.mock.calls[0][1]).toContain(
      'produced 12 spreadsheets to assist with your office’s review'
    );
  });
});

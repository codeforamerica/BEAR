import sinon from 'sinon';
import fs from 'fs';
import { runScript, writeSummaryOutput } from '../../app/utils/gogenUtils';

import defaultAnalysisOptions from '../../app/constants/defaultAnalysisOptions';

import * as FileUtils from '../../app/utils/fileUtils';

jest.mock('fs');

const sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
  jest.clearAllMocks();
});

describe('runScript', () => {
  let fakeCreateJsonFile;

  function createFakeSpawnChildProcess() {
    const fakeSpawnResponse = {
      stdout: {
        on: () => {}
      },
      stderr: {
        on: () => {}
      },
      on: () => {}
    };
    return sandbox.fake.returns(fakeSpawnResponse);
  }

  function setup() {
    const fakeSpawnChildProcess = createFakeSpawnChildProcess();
    const fakeGogenCallbackFunction = sandbox.spy();

    return {
      fakeSpawnChildProcess,
      fakeGogenCallbackFunction
    };
  }

  beforeEach(() => {
    fakeCreateJsonFile = sandbox.spy();
    FileUtils.createJsonFile = fakeCreateJsonFile;
  });

  it('calls child process with values from state', () => {
    const state = {
      ...defaultAnalysisOptions,
      gogenPath: 'gogenPath',
      dateTime: 'date',
      county: { name: 'Sacramento', code: 'SACRAMENTO' },
      dojFilePath: '/path/to/doj/file',
      outputFilePath: 'outputPath/outputPath'
    };

    const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

    runScript(state, fakeSpawnChildProcess, fakeGogenCallbackFunction);

    const { args } = fakeSpawnChildProcess.getCall(0);
    expect(args[0]).toEqual('gogenPath');
    expect(args[1]).toEqual([
      `run`,
      `--file-name-suffix=date`,
      `--input-doj=/path/to/doj/file`,
      `--outputs=outputPath/outputPath`,
      `--county=SACRAMENTO`,
      `--eligibility-options=outputPath/outputPath/eligibilityConfig_date.json`
    ]);
  });

  describe('when the output file path already exists', () => {
    beforeEach(() => {
      fs.__setExistsSync(true);
    });

    it('does not try to create it', () => {
      const state = {
        ...defaultAnalysisOptions,
        gogenPath: 'gogenPath',
        dateTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePath: '/path/to/doj/file',
        outputFilePath: 'outputPath/outputPath'
      };

      const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

      runScript(state, fakeSpawnChildProcess, fakeGogenCallbackFunction);

      expect(fs.mkdirSync.mock.calls.length).toEqual(0);
    });
  });

  describe('when the output file path does NOT exist', () => {
    beforeEach(() => {
      fs.__setExistsSync(false);
    });

    it('creates it', () => {
      const state = {
        ...defaultAnalysisOptions,
        gogenPath: 'gogenPath',
        dateTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePath: '/path/to/doj/file',
        outputFilePath: 'outputPath/outputPath'
      };

      const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

      runScript(state, fakeSpawnChildProcess, fakeGogenCallbackFunction);

      expect(fs.mkdirSync.mock.calls.length).toEqual(1);
      expect(fs.mkdirSync.mock.calls[0][0]).toEqual('outputPath/outputPath');
    });
  });

  describe('transforming eligibility options for consumption by gogen', () => {
    it('transforms the baseline eligibility options before creating the json file', () => {
      const stateWithReductions = {
        gogenPath: 'gogenPath',
        dateTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePath: '/path/to/doj/file',
        outputFilePath: 'outputPath/outputPath',
        baselineEligibilityOptions: {
          '11357(a)': 'reduce',
          '11357(b)': 'dismiss',
          '11357(c)': 'dismiss',
          '11357(d)': 'dismiss',
          '11358': 'reduce',
          '11359': 'dismiss',
          '11360': 'dismiss'
        },
        additionalReliefOptions: {
          subjectUnder21AtConviction: false,
          dismissOlderThanAgeThreshold: false,
          subjectAgeThreshold: 50,
          dismissYearsSinceConvictionThreshold: false,
          yearsSinceConvictionThreshold: 5,
          dismissYearsCrimeFreeThreshold: false,
          yearsCrimeFreeThreshold: 5,
          subjectHasOnlyProp64Charges: false
        }
      };

      const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

      runScript(
        stateWithReductions,
        fakeSpawnChildProcess,
        fakeGogenCallbackFunction
      );

      const { args } = fakeCreateJsonFile.getCall(0);
      expect(args[0].baselineEligibility.dismiss).toEqual([
        '11357(b)',
        '11357(c)',
        '11357(d)',
        '11359',
        '11360'
      ]);
      expect(args[0].baselineEligibility.reduce).toEqual(['11357(a)', '11358']);
    });

    describe('when additional relief options are selected', () => {
      it('passes the selected value of each option to createJsonFile', () => {
        const stateWithRelief = {
          gogenPath: 'gogenPath',
          dateTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePath: '/path/to/doj/file',
          outputFilePath: 'outputPath/outputPath',
          ...defaultAnalysisOptions
        };

        const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

        runScript(
          stateWithRelief,
          fakeSpawnChildProcess,
          fakeGogenCallbackFunction
        );

        const { args } = fakeCreateJsonFile.getCall(0);

        expect(args[0].additionalRelief).toEqual({
          subjectUnder21AtConviction: true,
          dismissOlderThanAgeThreshold: true,
          subjectAgeThreshold: 40,
          dismissYearsSinceConvictionThreshold: true,
          yearsSinceConvictionThreshold: 5,
          dismissYearsCrimeFreeThreshold: true,
          yearsCrimeFreeThreshold: 5,
          subjectHasOnlyProp64Charges: true,
          subjectIsDeceased: true
        });
      });
    });

    describe('when additional relief options are NOT selected', () => {
      it('passes 0 for value of each option to createJsonFile', () => {
        const stateWithoutRelief = {
          gogenPath: 'gogenPath',
          dateTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePath: '/path/to/doj/file',
          outputFilePath: 'outputPath/outputPath',
          baselineEligibilityOptions: {
            '11357(a)': 'dismiss',
            '11357(b)': 'dismiss',
            '11357(c)': 'dismiss',
            '11357(d)': 'dismiss',
            '11358': 'dismiss',
            '11359': 'dismiss',
            '11360': 'dismiss'
          },
          additionalReliefOptions: {
            subjectUnder21AtConviction: false,
            dismissOlderThanAgeThreshold: false,
            subjectAgeThreshold: 50,
            dismissYearsSinceConvictionThreshold: false,
            yearsSinceConvictionThreshold: 5,
            dismissYearsCrimeFreeThreshold: false,
            yearsCrimeFreeThreshold: 5,
            subjectHasOnlyProp64Charges: false,
            subjectIsDeceased: false
          }
        };

        const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

        runScript(
          stateWithoutRelief,
          fakeSpawnChildProcess,
          fakeGogenCallbackFunction
        );

        const { args } = fakeCreateJsonFile.getCall(0);

        expect(args[0].additionalRelief.subjectAgeThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsSinceConvictionThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsCrimeFreeThreshold).toBe(0);
      });
    });
  });
});

describe('writeSummaryOutput', () => {
  beforeEach(() => {
    const gogenOutput = 'output with &&&&&&this is the summary data we want';
    fs.__setFileContent(gogenOutput);
    const outputPath = '/tmp/';
    writeSummaryOutput(outputPath);
  });

  it('reads the contents of a file named tmp.txt in the project root', () => {
    expect(fs.readFileSync.mock.calls.length).toEqual(1);
    expect(fs.readFileSync.mock.calls[0]).toEqual(['tmp.txt', 'utf8']);
  });

  it('creates summaryOutput.txt with summary data and without the console progress bar', () => {
    expect(fs.writeFileSync.mock.calls.length).toEqual(1);
    expect(fs.writeFileSync.mock.calls[0]).toEqual([
      '/tmp/summaryOutput.txt',
      'this is the summary data we want',
      'utf8'
    ]);
  });

  it('deletes the tmp file after reading', () => {
    expect(fs.unlinkSync.mock.calls.length).toEqual(1);
    expect(fs.unlinkSync.mock.calls[0]).toEqual(['tmp.txt']);
  });
});

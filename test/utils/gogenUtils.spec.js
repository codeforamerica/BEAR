import sinon from 'sinon';
import fs from 'fs';
import {
  allEligibleConvictionsDismissed,
  runScript
} from '../../app/utils/gogenUtils';

import defaultAnalysisOptions from '../../app/constants/defaultAnalysisOptions';

import * as FileUtils from '../../app/utils/fileUtils';

jest.mock('fs');

const sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
  jest.clearAllMocks();
});

describe('allEligibleConvictionsDismissed', () => {
  describe('when baseline eligibility specifies to dismiss all', () => {
    it('returns true', () => {
      const transformedEligibilityOptions = {
        baselineEligibility: { dismiss: ['11357'], reduce: [] }
      };
      expect(
        allEligibleConvictionsDismissed(transformedEligibilityOptions)
      ).toEqual(true);
    });
  });

  describe('when baseline eligibility specifies to reduce at least one code', () => {
    it('returns false', () => {
      const transformedEligibilityOptions = {
        baselineEligibility: { dismiss: [], reduce: ['11357'] }
      };
      expect(
        allEligibleConvictionsDismissed(transformedEligibilityOptions)
      ).toEqual(false);
    });
  });
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

  describe('running gogen on a single file', () => {
    it('passes the file path to gogen along with other state values', () => {
      const state = {
        ...defaultAnalysisOptions,
        gogenPath: 'gogenPath',
        dateTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/first/path'],
        outputFilePath: 'outputPath/outputPath'
      };

      const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

      runScript(state, fakeSpawnChildProcess, fakeGogenCallbackFunction);

      const { args } = fakeSpawnChildProcess.getCall(0);
      expect(args[0]).toEqual('gogenPath');
      expect(args[1]).toEqual([
        `run`,
        `--file-name-suffix=date`,
        `--input-doj=/first/path`,
        `--outputs=outputPath/outputPath`,
        `--county=SACRAMENTO`,
        `--eligibility-options=outputPath/outputPath/eligibilityConfig_date.json`,
        `--compute-at=2020-07-01`
      ]);
    });
  });

  describe('running gogen on multiple files', () => {
    it('passes the input file paths as a comma-separated list to gogen, along with other state values', () => {
      const state = {
        ...defaultAnalysisOptions,
        gogenPath: 'gogenPath',
        dateTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/first/path', '/last/path'],
        outputFilePath: 'outputPath/outputPath'
      };

      const { fakeSpawnChildProcess, fakeGogenCallbackFunction } = setup();

      runScript(state, fakeSpawnChildProcess, fakeGogenCallbackFunction);

      expect(fakeSpawnChildProcess.callCount).toEqual(1);
      const { args } = fakeSpawnChildProcess.getCall(0);
      expect(args[0]).toEqual('gogenPath');
      expect(args[1]).toEqual([
        `run`,
        `--file-name-suffix=date`,
        `--input-doj=/first/path,/last/path`,
        `--outputs=outputPath/outputPath`,
        `--county=SACRAMENTO`,
        `--eligibility-options=outputPath/outputPath/eligibilityConfig_date.json`,
        `--compute-at=2020-07-01`
      ]);
    });
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
        dojFilePaths: ['/path/to/doj/file'],
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
        dojFilePaths: ['/path/to/doj/file'],
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
        dojFilePaths: ['/path/to/doj/file', 'hello'],
        outputFilePath: 'outputPath/outputPath',
        baselineEligibilityOptions: {
          '11357': 'dismiss',
          '11358': 'reduce',
          '11359': 'dismiss',
          '11360': 'dismiss'
        },
        additionalReliefOptions: {
          subjectUnder21AtConviction: false,
          dismissOlderThanAgeThreshold: false,
          subjectAgeThreshold: 0,
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
        '11357',
        '11359',
        '11360'
      ]);
      expect(args[0].baselineEligibility.reduce).toEqual(['11358']);
    });

    describe('when additional relief options are selected', () => {
      it('passes the selected value of each option to createJsonFile', () => {
        const stateWithRelief = {
          gogenPath: 'gogenPath',
          dateTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePaths: ['/path/to/doj/file'],
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
          subjectUnder21AtConviction: false,
          dismissOlderThanAgeThreshold: false,
          subjectAgeThreshold: 0,
          dismissYearsSinceConvictionThreshold: true,
          yearsSinceConvictionThreshold: 5,
          dismissYearsCrimeFreeThreshold: true,
          yearsCrimeFreeThreshold: 5,
          subjectHasOnlyProp64Charges: true,
          subjectIsDeceased: false
        });
      });
    });

    describe('when additional relief options are NOT selected', () => {
      it('passes 0 for value of each option to createJsonFile', () => {
        const stateWithoutRelief = {
          gogenPath: 'gogenPath',
          dateTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePaths: ['/path/to/doj/file'],
          outputFilePath: 'outputPath/outputPath',
          baselineEligibilityOptions: {
            '11357': 'dismiss',
            '11358': 'dismiss',
            '11359': 'dismiss',
            '11360': 'dismiss'
          },
          additionalReliefOptions: {
            subjectUnder21AtConviction: false,
            dismissOlderThanAgeThreshold: false,
            subjectAgeThreshold: 0,
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

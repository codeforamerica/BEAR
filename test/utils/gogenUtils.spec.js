import sinon from 'sinon';
import fs from 'fs';
import { runScript } from '../../app/utils/gogenUtils';

import defaultAnalysisOptions from '../../app/constants/defaultAnalysisOptions';

import * as FileUtils from '../../app/utils/fileUtils';
import * as writeSummaryOutputUtils from '../../app/utils/writeSummaryOutputUtils';

jest.mock('fs');

const sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
  jest.clearAllMocks();
});

describe('runScript', () => {
  let fakeCreateJsonFile;
  let fakeDeleteDirectory;
  let fakeWriteSummaryReport;

  function createFakeSpawnChildProcess(exitCode) {
    const callBackHandler = sandbox.fake.yields(exitCode);
    const fakeSpawnResponse = {
      stdout: {
        on: () => {}
      },
      stderr: {
        on: () => {}
      },
      on: callBackHandler
    };
    return sandbox.fake.returns(fakeSpawnResponse);
  }

  function setup(exitCode = 0) {
    const fakeSpawnChildProcess = createFakeSpawnChildProcess(exitCode);
    const fakeOnGogenComplete = sandbox.spy();
    const fakeUpdateImpactStatistics = sandbox.spy();

    return {
      fakeSpawnChildProcess,
      fakeOnGogenComplete,
      fakeUpdateImpactStatistics
    };
  }

  beforeEach(() => {
    const fakeGogenOutput = {};
    fs.__setFileContent(JSON.stringify(fakeGogenOutput));

    fakeCreateJsonFile = sandbox.spy();
    FileUtils.createJsonFile = fakeCreateJsonFile;

    fakeDeleteDirectory = sandbox.spy();
    FileUtils.deleteDirectoryRecursive = fakeDeleteDirectory;

    fakeWriteSummaryReport = sandbox.spy();
    writeSummaryOutputUtils.writeSummaryReport = fakeWriteSummaryReport;
  });

  describe('running gogen on a single file', () => {
    it('passes the file path to gogen along with other state values', () => {
      const state = {
        ...defaultAnalysisOptions,
        gogenPath: 'gogenPath',
        formattedGogenRunTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/first/path'],
        outputFilePath: 'outputPath/outputPath'
      };

      const {
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      } = setup();

      runScript(
        state,
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      );

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
        formattedGogenRunTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/first/path', '/last/path'],
        outputFilePath: 'outputPath/outputPath'
      };

      const {
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      } = setup();

      runScript(
        state,
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      );

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
        formattedGogenRunTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/path/to/doj/file'],
        outputFilePath: 'outputPath/outputPath'
      };

      const {
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      } = setup();

      runScript(
        state,
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      );

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
        formattedGogenRunTime: 'date',
        county: { name: 'Sacramento', code: 'SACRAMENTO' },
        dojFilePaths: ['/path/to/doj/file'],
        outputFilePath: 'outputPath/outputPath'
      };

      const {
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      } = setup();

      runScript(
        state,
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      );
      expect(fs.mkdirSync.mock.calls.length).toEqual(1);
      expect(fs.mkdirSync.mock.calls[0][0]).toEqual('outputPath/outputPath');
    });
  });

  describe('transforming eligibility options for consumption by gogen', () => {
    it('transforms the baseline eligibility options before creating the json file', () => {
      const stateWithReductions = {
        gogenPath: 'gogenPath',
        formattedGogenRunTime: 'date',
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

      const {
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
      } = setup();

      runScript(
        stateWithReductions,
        fakeSpawnChildProcess,
        fakeOnGogenComplete,
        fakeUpdateImpactStatistics
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
          formattedGogenRunTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePaths: ['/path/to/doj/file'],
          outputFilePath: 'outputPath/outputPath',
          ...defaultAnalysisOptions
        };

        const {
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
        } = setup();

        runScript(
          stateWithRelief,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
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
          formattedGogenRunTime: 'date',
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

        const {
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
        } = setup();

        runScript(
          stateWithoutRelief,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
        );

        const { args } = fakeCreateJsonFile.getCall(0);

        expect(args[0].additionalRelief.subjectAgeThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsSinceConvictionThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsCrimeFreeThreshold).toBe(0);
      });
    });
  });

  describe('when gogen completes', () => {
    describe('when there were no errors', () => {
      let state;
      let fakeSpawnChildProcess;
      let fakeOnGogenComplete;
      let fakeUpdateImpactStatistics;
      let preserveEligibilityConfig = false;

      beforeEach(() => {
        state = {
          ...defaultAnalysisOptions,
          gogenPath: 'gogenPath',
          formattedGogenRunTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePaths: ['/first/path', '/last/path'],
          outputFilePath: 'outputPath/outputPath'
        };

        ({
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
        } = setup(0));
      });

      it('writes the summary report', () => {
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fakeWriteSummaryReport.callCount).toEqual(1);
        const { args } = fakeWriteSummaryReport.getCall(0);
        expect(args[0]).toEqual({});
        expect(args[1]).toEqual('outputPath/outputPath');
        expect(args[2]).toEqual(['/first/path', '/last/path']);
        expect(args[3]).toEqual({
          baselineEligibility: {
            dismiss: ['11357', '11358', '11359', '11360'],
            reduce: []
          }
        });
      });

      it('updates the impact statistics', () => {
        const fakeGogenOutput = {
          reliefWithCurrentEligibilityChoices: {
            CountSubjectsNoFelony: 4,
            CountSubjectsNoConvictionLast7Years: 8,
            CountSubjectsNoConviction: 3
          }
        };

        fs.__setFileContent(JSON.stringify(fakeGogenOutput));
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fakeUpdateImpactStatistics.callCount).toEqual(1);
        const { args } = fakeUpdateImpactStatistics.getCall(0);
        expect(args[0]).toEqual({
          CountSubjectsNoFelony: 4,
          CountSubjectsNoConvictionLast7Years: 8,
          CountSubjectsNoConviction: 3
        });
      });

      it('deletes the gogen summary output file', () => {
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fs.unlinkSync.mock.calls.length).toEqual(2);
        const args = fs.unlinkSync.mock.calls[0];
        expect(args[0]).toEqual('outputPath/outputPath/gogen_date.json');
      });

      it('deletes the eligibility config file if PRESERVE_ELIGIBILITY_CONFIG is false', () => {
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fs.unlinkSync.mock.calls.length).toEqual(2);
        const args = fs.unlinkSync.mock.calls[1];
        expect(args[0]).toEqual(
          'outputPath/outputPath/eligibilityConfig_date.json'
        );
      });

      it('does NOT delete the eligibility config file if PRESERVE_ELIGIBILITY_CONFIG is true', () => {
        preserveEligibilityConfig = true;

        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fs.unlinkSync.mock.calls.length).toEqual(1);
      });

      it('does NOT delete the results folders', () => {
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fakeDeleteDirectory.callCount).toEqual(0);
      });

      it('calls the completion callback', () => {
        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );

        expect(fakeOnGogenComplete.callCount).toEqual(1);
        const { args } = fakeOnGogenComplete.getCall(0);
        expect(args[0]).toEqual(0);
        expect(args[1]).toEqual('');
      });
    });

    describe('when gogen returned errors', () => {
      let errorText;
      let fakeSpawnChildProcess;
      let fakeOnGogenComplete;
      let fakeUpdateImpactStatistics;

      beforeEach(() => {
        errorText = 'error text';
        fs.__setFileContent(errorText);
        const preserveEligibilityConfig = false;

        const state = {
          ...defaultAnalysisOptions,
          gogenPath: 'gogenPath',
          formattedGogenRunTime: 'date',
          county: { name: 'Sacramento', code: 'SACRAMENTO' },
          dojFilePaths: ['/first/path', '/last/path'],
          outputFilePath: 'outputPath/outputPath'
        };

        ({
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics
        } = setup(1));

        runScript(
          state,
          fakeSpawnChildProcess,
          fakeOnGogenComplete,
          fakeUpdateImpactStatistics,
          preserveEligibilityConfig
        );
      });

      it('parses the errors', () => {
        expect(fs.readFileSync.mock.calls.length).toEqual(1);
        const args = fs.readFileSync.mock.calls[0];
        expect(args[0]).toEqual('outputPath/outputPath/gogen_date.err');
        expect(args[1]).toEqual('utf8');
      });

      it('does NOT update the impact statistics', () => {
        expect(fakeUpdateImpactStatistics.callCount).toEqual(0);
      });

      it('deletes the results folders for each DOJ input file', () => {
        expect(fakeDeleteDirectory.callCount).toEqual(2);
        const args1 = fakeDeleteDirectory.getCall(0).args;
        expect(args1[0]).toEqual(
          'outputPath/outputPath/DOJ_Input_File_1_Results_date'
        );
        const args2 = fakeDeleteDirectory.getCall(1).args;
        expect(args2[0]).toEqual(
          'outputPath/outputPath/DOJ_Input_File_2_Results_date'
        );
      });

      it('does NOT delete the eligibility config file', () => {
        expect(fs.unlinkSync.mock.calls.length).toEqual(0);
      });

      it('calls the completion callback with parsed errors', () => {
        expect(fakeOnGogenComplete.callCount).toEqual(1);
        const { args } = fakeOnGogenComplete.getCall(0);
        expect(args[0]).toEqual(1);
        expect(args[1]).toEqual(errorText);
      });
    });
  });
});

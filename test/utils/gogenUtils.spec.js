import sinon from 'sinon';
import fs from 'fs';
import { runScript } from '../../app/utils/gogenUtils';
import defaultAnalysisOptions from '../../app/constants/defaultAnalysisOptions';

describe('runScript', () => {
  const sandbox = sinon.createSandbox();

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
    const fakeCreateJsonFile = sandbox.spy();
    const fakeGogenPDFFunction = sandbox.spy();

    return {
      fakeSpawnChildProcess,
      fakeCreateJsonFile,
      fakeGogenPDFFunction
    };
  }

  afterEach(() => {
    sandbox.restore();

    fs.rmdirSync('outputPath/outputPath');
    fs.rmdirSync('outputPath');
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

    const {
      fakeSpawnChildProcess,
      fakeCreateJsonFile,
      fakeGogenPDFFunction
    } = setup();

    runScript(
      state,
      fakeSpawnChildProcess,
      fakeCreateJsonFile,
      fakeGogenPDFFunction
    );

    const { args } = fakeSpawnChildProcess.getCall(0);
    expect(args[0]).toEqual('gogenPath');
    expect(args[1]).toEqual([
      `run`,
      `--date-for-file-name=date`,
      `--input-doj=/path/to/doj/file`,
      `--outputs=outputPath/outputPath`,
      `--county=SACRAMENTO`,
      `--eligibility-options=outputPath/outputPath/eligibilityConfig_date.json`
    ]);
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

      const {
        fakeSpawnChildProcess,
        fakeCreateJsonFile,
        fakeGogenPDFFunction
      } = setup();

      runScript(
        stateWithReductions,
        fakeSpawnChildProcess,
        fakeCreateJsonFile,
        fakeGogenPDFFunction
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

        const {
          fakeSpawnChildProcess,
          fakeCreateJsonFile,
          fakeGogenPDFFunction
        } = setup();

        runScript(
          stateWithRelief,
          fakeSpawnChildProcess,
          fakeCreateJsonFile,
          fakeGogenPDFFunction
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
          subjectHasOnlyProp64Charges: true
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
            subjectHasOnlyProp64Charges: false
          }
        };

        const {
          fakeSpawnChildProcess,
          fakeCreateJsonFile,
          fakeGogenPDFFunction
        } = setup();

        runScript(
          stateWithoutRelief,
          fakeSpawnChildProcess,
          fakeCreateJsonFile,
          fakeGogenPDFFunction
        );

        const { args } = fakeCreateJsonFile.getCall(0);

        expect(args[0].additionalRelief.subjectAgeThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsSinceConvictionThreshold).toBe(0);
        expect(args[0].additionalRelief.yearsCrimeFreeThreshold).toBe(0);
      });
    });
  });
});

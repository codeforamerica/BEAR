import sinon from 'sinon';
import fs from 'fs';
import {
  runScript,
  transformBaselineEligibilityOptions,
  transformSubjectAgeThreshold
} from '../../app/utils/gogenUtils';

describe('transformBaselineEligibilityOptions', () => {
  it('formats the eligibility options for the json file', () => {
    const optionState = {
      '11357(a)': 'dismiss',
      '11357(b)': 'dismiss',
      '11357(c)': 'reduce',
      '11357(d)': 'dismiss',
      '11358': 'dismiss',
      '11359': 'reduce',
      '11360': 'reduce'
    };
    const subject = transformBaselineEligibilityOptions(optionState);
    expect(subject).toEqual({
      baselineEligibility: {
        dismiss: ['11357(a)', '11357(b)', '11357(d)', '11358'],
        reduce: ['11357(c)', '11359', '11360']
      }
    });
  });
});

describe('transformSubjectAgeThreshold', () => {
  describe('when dismissOlderThanAgeThreshold is true', () => {
    it('passes through the subjectAgeThreshold', () => {
      const optionState = {
        dismissOlderThanAgeThreshold: true,
        subjectAgeThreshold: 40
      };
      const subject = transformSubjectAgeThreshold(optionState);
      expect(subject).toEqual({ subjectAgeThreshold: 40 });
    });
  });

  describe('when dismissOlderThanAgeThreshold is false', () => {
    it('sets subjectAgeThreshold to 0', () => {
      const optionState = {
        dismissOlderThanAgeThreshold: false,
        subjectAgeThreshold: 40
      };
      const subject = transformSubjectAgeThreshold(optionState);
      expect(subject).toEqual({ subjectAgeThreshold: 0 });
    });
  });
});

describe('runScript', () => {
  const sandbox = sinon.createSandbox();

  const state = {
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
      subjectUnder21AtConviction: true,
      dismissOlderThanAgeThreshold: false,
      subjectAgeThreshold: 50
    }
  };

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

  const fakeSpawnChildProcess = createFakeSpawnChildProcess();
  const fakeCreateJsonFile = sandbox.spy();
  const fakeGogenPDFFunction = sandbox.spy();

  afterEach(() => {
    sandbox.restore();

    fs.rmdirSync('outputPath/outputPath');
    fs.rmdirSync('outputPath');
  });

  it('calls child process with values from state', () => {
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

  it('passes the transformed eligibility config to createJsonFile', () => {
    runScript(
      state,
      fakeSpawnChildProcess,
      fakeCreateJsonFile,
      fakeGogenPDFFunction
    );

    const { args } = fakeCreateJsonFile.getCall(0);
    expect(args[0].baselineEligibility.dismiss).toEqual([
      '11357(a)',
      '11357(b)',
      '11357(c)',
      '11357(d)',
      '11358',
      '11359',
      '11360'
    ]);

    expect(args[0].baselineEligibility.reduce).toEqual([]);
    expect(args[0].additionalRelief.subjectUnder21AtConviction).toBe(true);
    expect(args[0].additionalRelief.subjectAgeThreshold).toBe(0);
  });
});

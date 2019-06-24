import sinon from 'sinon';
import fs from 'fs';
import {
  runScript,
  transformEligibilityOptions
} from '../../app/utils/gogenUtils';

describe('transformEligibilityOptions', () => {
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
    const subject = transformEligibilityOptions(optionState);
    expect(subject).toEqual({
      baselineEligibility: {
        dismiss: ['11357(A)', '11357(B)', '11357(D)', '11358'],
        reduce: ['11357(C)', '11359', '11360']
      }
    });
  });
});

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

  afterEach(() => {
    sandbox.restore();
  });

  it('calls child process with values from state', () => {
    const fakeSpawnChildProcess = createFakeSpawnChildProcess();
    const state = {
      gogenPath: 'gogenPath',
      dateTime: 'date',
      county: { name: 'Sacramento', code: 'SACRAMENTO' },
      dojFilePath: '/path/to/doj/file',
      outputFilePath: 'outputPath',
      baselineEligibilityOptions: {
        '11357(a)': 'dismiss',
        '11357(b)': 'dismiss',
        '11357(c)': 'dismiss',
        '11357(d)': 'dismiss',
        '11358': 'dismiss',
        '11359': 'dismiss',
        '11360': 'dismiss'
      }
    };

    runScript(state, fakeSpawnChildProcess);

    const { args } = fakeSpawnChildProcess.getCall(0);
    expect(args[0]).toEqual('gogenPath');
    expect(args[1]).toEqual([
      `run`,
      `--date-for-file-name=date`,
      `--input-doj=/path/to/doj/file`,
      `--outputs=outputPath`,
      `--county=SACRAMENTO`,
      `--eligibility-options=outputPath/eligibilityConfig.json`
    ]);

    fs.unlinkSync('outputPath/eligibilityConfig.json');
    fs.rmdirSync('outputPath');
  });
});

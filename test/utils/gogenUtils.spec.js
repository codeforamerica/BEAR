import sinon from 'sinon';
import fs from 'fs';
import {
  runScript,
  transformEligibilityOptions
} from '../../app/utils/gogenUtils';

describe('transformEligibilityOptions', () => {
  it('formats the eligibility options for the json file', () => {
    const optionState = {
      '0': { codeSection: '11357(a)', option: 'dismiss' },
      '1': { codeSection: '11357(b)', option: 'dismiss' },
      '2': { codeSection: '11357(c)', option: 'reduce' },
      '3': { codeSection: '11357(d)', option: 'dismiss' },
      '4': { codeSection: '11358', option: 'dismiss' },
      '5': { codeSection: '11359', option: 'reduce' },
      '6': { codeSection: '11360', option: 'reduce' }
    };
    const subject = transformEligibilityOptions(optionState);
    expect(subject).toEqual({
      dismiss: ['11357(A)', '11357(B)', '11357(D)', '11358'],
      reduce: ['11357(C)', '11359', '11360']
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
      county: { name: 'Sacramento', code: 'SACRAMENTO' },
      dojFilePath: '/path/to/doj/file',
      outputFilePath: 'outputPath',
      baselineEligibilityOptions: {
        '0': { codeSection: '11357(a)', option: 'dismiss' },
        '1': { codeSection: '11357(b)', option: 'dismiss' },
        '2': { codeSection: '11357(c)', option: 'dismiss' },
        '3': { codeSection: '11357(d)', option: 'dismiss' },
        '4': { codeSection: '11358', option: 'dismiss' },
        '5': { codeSection: '11359', option: 'dismiss' },
        '6': { codeSection: '11360', option: 'dismiss' }
      }
    };

    runScript(state, fakeSpawnChildProcess);

    const { args } = fakeSpawnChildProcess.getCall(0);
    expect(args[0]).toEqual('gogenPath');
    expect(args[1]).toEqual([
      `--input-doj=/path/to/doj/file`,
      `--outputs=outputPath`,
      `--county="SACRAMENTO"`,
      `--jsonPath=outputPath/eligibilityConfig.json`
    ]);

    fs.unlinkSync('outputPath/eligibilityConfig.json');
    fs.rmdirSync('outputPath');
  });
});

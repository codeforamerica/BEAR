import fs from 'fs';
import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProcessingFormCard from '../../app/components/ProcessingFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const runScriptSpy = sandbox.spy();
  const startOverSpy = sandbox.spy();
  const resetOutputPathSpy = sandbox.spy();
  const getFileSizeSpy = sandbox.spy();

  const component = shallow(
    <ProcessingFormCard
      dojFilePath="/tmp/path"
      outputFilePath="./test"
      getFileSize={getFileSizeSpy}
      runScriptInOptions={runScriptSpy}
      onStartOver={startOverSpy}
      resetOutputPath={resetOutputPathSpy}
    />
  );

  return {
    component,
    startOverSpy,
    resetOutputPathSpy
  };
}

beforeEach(() => {
  fs.writeFileSync('tmp.txt', 'hello world &&&&&& goodbye');
});

afterEach(() => {
  sandbox.restore();
  fs.unlinkSync('./test/summaryOutput.txt');
});

describe('ProcessingFormCard component', () => {
  describe('onGogenComplete', () => {
    it('should set state when Gogen was successful', () => {
      const { component } = setup();
      expect(component.state().gogenComplete).toEqual(false);
      component.instance().onGogenComplete(0, 'OK');
      expect(component.state().gogenComplete).toEqual(true);
    });
  });
});

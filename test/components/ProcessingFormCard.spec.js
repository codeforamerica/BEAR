import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProcessingFormCard from '../../app/components/ProcessingFormCard';

import * as FileUtils from '../../app/utils/fileUtils';
import * as GogenUtils from '../../app/utils/gogenUtils';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();
let writeReportSpy;

function setup() {
  const runScriptSpy = sandbox.spy();
  const startOverSpy = sandbox.spy();
  const resetOutputPathSpy = sandbox.spy();

  sandbox.stub(FileUtils, 'getFileSize').returns(1000);

  const component = mount(
    <ProcessingFormCard
      dojFilePath="/tmp/path"
      outputFilePath="./test"
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
  writeReportSpy = sandbox.spy();
  GogenUtils.writeSummaryOutput = writeReportSpy;
});

afterEach(() => {
  sandbox.restore();
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
  describe('clicking the Start Over button', () => {
    it('should call resetOutputPath', () => {
      const { component, resetOutputPathSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(resetOutputPathSpy.called).toBe(true);
      expect(resetOutputPathSpy.callCount).toEqual(1);
    });
    it('should call onStartOver and return the user to the home page', () => {
      const { component, startOverSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(startOverSpy.called).toBe(true);
      expect(startOverSpy.callCount).toEqual(1);
    });

    it('should call writeSummaryReport with the correct path', () => {
      const { component } = setup();
      expect(component.state().gogenComplete).toEqual(false);
      component.instance().onGogenComplete();
      expect(writeReportSpy.called).toEqual(true);
      expect(writeReportSpy.callCount).toEqual(1);
      const { args } = writeReportSpy.getCall(0);
      expect(args[0]).toEqual('./test');
    });
  });
});

import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ProcessingFormCard from '../../app/components/ProcessingFormCard';

import * as FileUtils from '../../app/utils/fileUtils';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const runScriptSpy = sandbox.spy();
  const startOverSpy = sandbox.spy();
  const resetOutputPathSpy = sandbox.spy();

  sandbox.stub(FileUtils, 'getFileSize').returns(1000);

  const component = mount(
    <ProcessingFormCard
      dojFilePaths={['file.one', 'file.two', 'file.three']}
      runScriptInOptions={runScriptSpy}
      onStartOver={startOverSpy}
    />
  );

  return {
    component,
    startOverSpy,
    resetOutputPathSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ProcessingFormCard component', () => {
  describe('onScriptComplete', () => {
    it('should set state when Gogen was successful', () => {
      const { component } = setup();
      expect(component.state().gogenComplete).toEqual(false);
      component.instance().onScriptComplete(0, 'OK');
      expect(component.state().gogenComplete).toEqual(true);
    });
  });

  describe('calculateFileSizes', () => {
    it('returns total size of all provided files', () => {
      const { component } = setup();
      expect(component.instance().calculateFileSizes()).toEqual(3000);
    });
  });

  describe('clicking the Start Over button', () => {
    it('should call onStartOver and return the user to the home page', () => {
      const { component, startOverSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(startOverSpy.called).toBe(true);
      expect(startOverSpy.callCount).toEqual(1);
    });
  });
});

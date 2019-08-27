import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ResultsFormCard from '../../app/components/ResultsFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const showFileInFolderSpy = sandbox.spy();
  const startOverSpy = sandbox.spy();
  const resetOutputPathSpy = sandbox.spy();
  const component = mount(
    <ResultsFormCard
      county="Alameda"
      outputFolder="/path/to/output"
      showFileInFolder={showFileInFolderSpy}
      onStartOver={startOverSpy}
      resetOutputPath={resetOutputPathSpy}
    />
  );
  return {
    component,
    showFileInFolderSpy,
    startOverSpy,
    resetOutputPathSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ResultsFormCard component', () => {
  describe('clicking the Open Folder button', () => {
    it('should call the openResultsFolder function with path to summary report', () => {
      const { component, showFileInFolderSpy } = setup();
      const showFileInFolderButton = component.find('#view_results').at(0);
      showFileInFolderButton.simulate('click');
      expect(showFileInFolderSpy.called).toBe(true);
      const { args } = showFileInFolderSpy.getCall(0);
      expect(args[0]).toEqual('/path/to/output/Summary_Report.pdf');
    });
  });

  describe('clicking the Start Over button', () => {
    it('should call reset path', () => {
      const { component, resetOutputPathSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(resetOutputPathSpy.called).toBe(true);
      expect(resetOutputPathSpy.callCount).toEqual(1);
    });
    it('should call start over and return the user to the home page', () => {
      const { component, startOverSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(startOverSpy.called).toBe(true);
      expect(startOverSpy.callCount).toEqual(1);
    });
  });

  it('should match exact snapshot', () => {
    const component = (
      <div>
        <ResultsFormCard county="Alameda" outputFolder="/path/to/output" />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

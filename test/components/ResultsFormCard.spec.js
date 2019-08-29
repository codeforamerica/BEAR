import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ResultsFormCard from '../../app/components/ResultsFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const openFolderSpy = sandbox.spy();
  const startOverSpy = sandbox.spy();
  const impactStats = {
    noFelony: 2000,
    noConvictionLast7: 5000,
    noConviction: 1200
  };
  const component = mount(
    <ResultsFormCard
      county="Alameda"
      outputFolder="/path/to/output"
      impactStatistics={impactStats}
      openFolder={openFolderSpy}
      onStartOver={startOverSpy}
    />
  );
  return {
    component,
    openFolderSpy,
    startOverSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ResultsFormCard component', () => {
  describe('clicking the Open Folder button', () => {
    it('should call the openResultsFolder function', () => {
      const { component, openFolderSpy } = setup();
      const openFolderButton = component.find('#view_results').at(0);
      openFolderButton.simulate('click');
      expect(openFolderSpy.called).toBe(true);
      const { args } = openFolderSpy.getCall(0);
      expect(args[0]).toEqual('/path/to/output');
    });
  });

  describe('clicking the Start Over button', () => {
    it('should call start over and return the user to the home page', () => {
      const { component, startOverSpy } = setup();
      const startOverButton = component.find('#start_over').at(0);
      startOverButton.simulate('click');
      expect(startOverSpy.called).toBe(true);
      expect(startOverSpy.callCount).toEqual(1);
    });
  });

  it('should match exact snapshot', () => {
    const impactStats = {
      noFelony: 2000,
      noConvictionLast7: 5000,
      noConviction: 1200
    };
    const component = (
      <div>
        <ResultsFormCard
          county="Alameda"
          outputFolder="/path/to/output"
          impactStatistics={impactStats}
        />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ResultsFormCard from '../../app/components/ResultsFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const fakeOpenFolder = sandbox.spy();
  const component = mount(
    <ResultsFormCard
      county="Alameda"
      outputFolder="/path/to/output"
      openFolder={fakeOpenFolder}
    />
  );
  return {
    component,
    fakeOpenFolder
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ResultsFormCard component', () => {
  describe('clicking the Open Folder button', () => {
    it('should call the openResultsFolder function', () => {
      const { component, fakeOpenFolder } = setup();
      const openFolderButton = component.find('#view_results').at(0);
      openFolderButton.simulate('click');
      expect(fakeOpenFolder.called).toBe(true);
      const { args } = fakeOpenFolder.getCall(0);
      expect(args[0]).toEqual('/path/to/output');
    });
  });

  it('should match exact snapshot', () => {
    const component = (
      <div>
        <ResultsFormCard county="Alameda" />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

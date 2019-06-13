import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ResultsFormCard from '../../app/components/ResultsFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const fakeOpenResultsFolder = sandbox.spy();
  const component = mount(
    <ResultsFormCard
      county="Alameda"
      openResultsFolder={fakeOpenResultsFolder}
    />
  );
  return {
    component,
    fakeOpenResultsFolder
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ResultsFormCard component', () => {
  describe('clicking the Open Folder button', () => {
    it('should call the openResultsFolder function', () => {
      const { component, fakeOpenResultsFolder } = setup();
      const openFolderButton = component.find('button').at(0);
      openFolderButton.simulate('click');
      expect(fakeOpenResultsFolder.called).toBe(true);
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

import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Home from '../../app/components/Home';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup(isPackaged) {
  process.env.HOME = '/test/home/path';
  process.resourcesPath = '/test/resources/path';
  process.env.IS_PACKAGED = isPackaged;
  const fakeSpawnResponse = {
    stdout: {
      on: () => {}
    },
    stderr: {
      on: () => {}
    },
    on: () => {}
  };
  const fakeSpawnChildProcess = sandbox.fake.returns(fakeSpawnResponse);
  const component = shallow(<Home spawnChildProcess={fakeSpawnChildProcess} />);
  return {
    component,
    fakeSpawnChildProcess
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('Home component', () => {
  describe('gogen path', () => {
    it('should point to the home directory when the app is not packaged', () => {
      const { component } = setup('false');
      const gogenPath = component.state('gogenPath');
      expect(gogenPath).toEqual('/test/home/path/go/bin/gogen');
    });

    it('should point to the resources directory when the app is not packaged', () => {
      const { component } = setup('true');
      const gogenPath = component.state('gogenPath');
      expect(gogenPath).toEqual('/test/resources/path/gogen');
    });
  });

  it('should spawn child process when run button is clicked', () => {
    const { component, fakeSpawnChildProcess } = setup('false');
    const runButton = component.find('button').at(0);
    runButton.simulate('click');
    expect(fakeSpawnChildProcess.called).toBe(true);
  });

  it('calls child process with values from state', () => {
    const { component, fakeSpawnChildProcess } = setup('false');
    component.setState({
      gogenPath: 'gogenPath',
      selectedCountyCode: 'SACRAMENTO',
      dojFilePath: '/path/to/doj/file',
      outputFilePath: 'outputPath'
    });
    const runButton = component.find('button').at(0);
    runButton.simulate('click');
    const { args } = fakeSpawnChildProcess.getCall(0);
    expect(args[0]).toEqual('gogenPath');
    expect(args[1]).toEqual([
      `--input-doj=/path/to/doj/file`,
      `--outputs=outputPath`,
      `--county="SACRAMENTO"`
    ]);
  });

  it('should match exact snapshot', () => {
    const counter = (
      <div>
        <Home />
      </div>
    );

    const tree = renderer.create(counter).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

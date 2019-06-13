import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Home from '../../app/components/Home';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(isPackaged, platform = 'windows') {
  process.env.HOME = '/test/home/path';
  process.resourcesPath = '/test/resources/path';
  process.env.IS_PACKAGED = isPackaged;
  process.env.PLATFORM = platform;
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
  describe('initial state', () => {
    it('sets the currentScreen to 1', () => {
      const { component } = setup('false');
      expect(component.state('currentScreen')).toEqual(0);
    });

    it('sets the county to an object with an empty name and value', () => {
      const { component } = setup('false');
      const county = component.state('county');
      expect(county).toEqual({ name: '', code: '' });
    });

    it('sets the baseline eligibility options to an object with all options set to dismiss', () => {
      const { component } = setup('false');
      const baselineEligibilityOptions = component.state(
        'baselineEligibilityOptions'
      );
      expect(baselineEligibilityOptions).toEqual({
        '0': { codeSection: '11357(a)', option: 'dismiss' },
        '1': { codeSection: '11357(b)', option: 'dismiss' },
        '2': { codeSection: '11357(c)', option: 'dismiss' },
        '3': { codeSection: '11357(d)', option: 'dismiss' },
        '4': { codeSection: '11358', option: 'dismiss' },
        '5': { codeSection: '11359', option: 'dismiss' },
        '6': { codeSection: '11360', option: 'dismiss' }
      });
    });

    describe('gogen path', () => {
      it('should point to the home directory when the app is not packaged', () => {
        const { component } = setup('false');
        const gogenPath = component.state('gogenPath');
        expect(gogenPath).toEqual('/test/home/path/go/bin/gogen');
      });

      describe('when the platform is windows', () => {
        it('should point to an exe in the resources directory when the app is packaged', () => {
          const { component } = setup('true', 'windows');
          const gogenPath = component.state('gogenPath');
          expect(gogenPath).toEqual('/test/resources/path/gogen.exe');
        });
      });

      describe('when the platform is darwin (mac)', () => {
        it('should point to a mac binary in the resources directory when the app is packaged', () => {
          const { component } = setup('true', 'darwin');
          const gogenPath = component.state('gogenPath');
          expect(gogenPath).toEqual('/test/resources/path/gogen');
        });
      });
    });
  });

  describe('updateCounty', () => {
    it('sets the selected county on the state', () => {
      const { component } = setup('true');
      const newCounty = { name: 'Eternia', code: 'ETERNIA' };
      expect(component.state('county')).toEqual({ name: '', code: '' });
      component.instance().updateCounty(newCounty);
      expect(component.state('county')).toEqual(newCounty);
    });
  });

  describe('updateDojFilePath', () => {
    it('sets the selected file path on the state', () => {
      const { component } = setup('true');
      const filePath = 'path/to/file';
      expect(component.state('dojFilePath')).toEqual('');
      component.instance().updateFilePath(filePath);
      expect(component.state('dojFilePath')).toEqual(filePath);
    });
  });

  describe('nextScreen', () => {
    it('increments state.currentScreen', () => {
      const { component } = setup('true');
      expect(component.state('currentScreen')).toEqual(0);
      component.instance().nextScreen();
      expect(component.state('currentScreen')).toEqual(1);
    });
  });

  describe('previousScreen', () => {
    it('decrements state.currentScreen', () => {
      const { component } = setup('true');
      component.instance().setState({ currentScreen: 3 });
      expect(component.state('currentScreen')).toEqual(3);
      component.instance().previousScreen();
      expect(component.state('currentScreen')).toEqual(2);
    });
  });

  describe('updateEligibilityOptions', () => {
    it('updates state.baselineEligibilityOptions for the given code section and option', () => {
      const { component } = setup('true');
      expect(component.state('baselineEligibilityOptions')['0'].option).toEqual(
        'dismiss'
      );
      component.instance().updateEligibilityOptions('0', 'reduce');
      expect(component.state('baselineEligibilityOptions')['0'].option).toEqual(
        'reduce'
      );
    });
  });

  describe('runScript', () => {
    it('calls child process with values from state', () => {
      const { component, fakeSpawnChildProcess } = setup('false');
      component.setState({
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
        },
        jsonPath: './eligibilityFile'
      });
      component.update();
      component.instance().runScript();
      const { args } = fakeSpawnChildProcess.getCall(0);
      expect(args[0]).toEqual('gogenPath');
      expect(args[1]).toEqual([
        `--input-doj=/path/to/doj/file`,
        `--outputs=outputPath`,
        `--county="SACRAMENTO"`,
        `--jsonPath=./eligibilityFile`
      ]);
    });
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

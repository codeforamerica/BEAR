import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import sinon from 'sinon';
import Home from '../../app/components/Home';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(isPackaged, platform = 'windows') {
  process.env.HOME = '/tmp/test/home/path';
  process.resourcesPath = '/tmp/test/resources/path';
  process.env.IS_PACKAGED = isPackaged;
  process.env.PLATFORM = platform;
  const spawnChildProcessSpy = createFakeSpawnChildProcess();
  sinon.useFakeTimers(new Date(2011, 0, 1).getTime());

  const component = shallow(<Home spawnChildProcess={spawnChildProcessSpy} />);
  return { component };
}

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

describe('Home component', () => {
  describe('initial state', () => {
    it('sets the currentScreen to 0', () => {
      const { component } = setup('false');
      expect(component.state('currentScreen')).toEqual(0);
    });

    it('sets the initial file path to HOME/desktop', () => {
      const { component } = setup('false');
      expect(component.state('outputPathPrefix')).toEqual(
        '/tmp/test/home/path/Desktop/Clear_My_Record_output/CMR_output'
      );
    });

    it('sets the output file path to any empty string', () => {
      const { component } = setup('false');
      expect(component.state('outputFilePath')).toEqual('');
    });

    it('sets the county to an object with an empty name and value', () => {
      const { component } = setup('false');
      const county = component.state('county');
      expect(county).toEqual({ name: '', code: '' });
    });

    it('sets the dateTime to an empty string', () => {
      const { component } = setup('false');
      const dateTime = component.state('dateTime');
      expect(dateTime).toEqual('');
    });

    it('sets the baseline eligibility options to an object with all options set to dismiss', () => {
      const { component } = setup('false');
      const baselineEligibilityOptions = component.state(
        'baselineEligibilityOptions'
      );
      expect(baselineEligibilityOptions).toEqual({
        '11357(a)': 'dismiss',
        '11357(b)': 'dismiss',
        '11357(c)': 'dismiss',
        '11357(d)': 'dismiss',
        '11358': 'dismiss',
        '11359': 'dismiss',
        '11360': 'dismiss'
      });
    });

    it('sets the additional relief options to an object with the correct defaults', () => {
      const { component } = setup('false');
      const additionalReliefOptions = component.state(
        'additionalReliefOptions'
      );
      expect(additionalReliefOptions).toEqual({
        subjectUnder21AtConviction: true,
        dismissOlderThanAgeThreshold: true,
        subjectAgeThreshold: 40,
        dismissYearsSinceConvictionThreshold: true,
        yearsSinceConvictionThreshold: 5,
        dismissYearsCrimeFreeThreshold: true,
        yearsCrimeFreeThreshold: 5,
        subjectHasOnlyProp64Charges: true
      });
    });

    describe('gogen path', () => {
      it('should point to the home directory when the app is not packaged', () => {
        const { component } = setup('false');
        const gogenPath = component.state('gogenPath');
        expect(gogenPath).toEqual('/tmp/test/home/path/go/bin/gogen');
      });

      describe('when the platform is windows', () => {
        it('should point to an exe in the resources directory when the app is packaged', () => {
          const { component } = setup('true', 'windows');
          const gogenPath = component.state('gogenPath');
          expect(gogenPath).toEqual('/tmp/test/resources/path/gogen.exe');
        });
      });

      describe('when the platform is darwin (mac)', () => {
        it('should point to a mac binary in the resources directory when the app is packaged', () => {
          const { component } = setup('true', 'darwin');
          const gogenPath = component.state('gogenPath');
          expect(gogenPath).toEqual('/tmp/test/resources/path/gogen');
        });
      });
    });

    describe('summary template path', () => {
      it('should point to the resources directory when the app is not packaged', () => {
        const { component } = setup('false');
        const summaryTemplatePath = component.state('summaryTemplatePath');
        expect(summaryTemplatePath).toEqual(
          './resources/summaryReportTemplate.pdf'
        );
      });

      it('should point to a mac binary in the resources directory when the app is packaged', () => {
        const { component } = setup('true');
        const summaryTemplatePath = component.state('summaryTemplatePath');
        expect(summaryTemplatePath).toEqual(
          '/tmp/test/resources/path/resources/summaryReportTemplate.pdf'
        );
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

  describe('eligibilityOptionsNextScreen', () => {
    it('Adds 1 to state.currentScreen if at least one charge is reduced', () => {
      const { component } = setup('true');
      component.setState({
        currentScreen: 3,
        baselineEligibilityOptions: {
          '11357(a)': 'reduce',
          '11357(b)': 'dismiss',
          '11357(c)': 'dismiss',
          '11357(d)': 'dismiss',
          '11358': 'dismiss',
          '11359': 'dismiss',
          '11360': 'dismiss'
        }
      });
      expect(component.state('currentScreen')).toEqual(3);
      component.instance().eligibilityOptionsNextScreen();
      expect(component.state('currentScreen')).toEqual(4);
    });

    it('Adds 2 to state.currentScreen if all charges are dismissed', () => {
      const { component } = setup('true');
      component.setState({ currentScreen: 3 });
      expect(component.state('currentScreen')).toEqual(3);
      component.instance().eligibilityOptionsNextScreen();
      expect(component.state('currentScreen')).toEqual(5);
    });
  });

  describe('updateStateWithEligibilityOptions', () => {
    it('updates state.baselineEligibilityOptions for the given code section and option', () => {
      const { component } = setup('true');
      expect(component.state('baselineEligibilityOptions')['11357(a)']).toEqual(
        'dismiss'
      );
      component
        .instance()
        .updateStateWithEligibilityOptions('11357(a)', 'reduce');
      expect(component.state('baselineEligibilityOptions')['11357(a)']).toEqual(
        'reduce'
      );
    });
  });

  describe('updateDateForPath', () => {
    it('updates state.dateTime and outputFilePath', () => {
      const { component } = setup('true');
      expect(component.state('outputFilePath')).toEqual('');
      expect(component.state('dateTime')).toEqual('');
      component.instance().updateDateForPath();
      expect(component.state('outputFilePath')).toEqual(
        '/tmp/test/home/path/Desktop/Clear_My_Record_output/CMR_output_Jan_1_2011_0.00.00.AM'
      );
      expect(component.state('dateTime')).toEqual('Jan_1_2011_0.00.00.AM');
    });
  });

  describe('resetOutputPath', () => {
    it('resets the date after restart', () => {
      const { component } = setup('true');
      expect(component.state('dojFilePath')).toEqual('');
      component.instance().updateStateWithEligibilityOptions();
      component.instance().resetOutputPath();
      expect(component.state('outputFilePath')).toEqual(
        component.state('outputPathPrefix')
      );
    });
  });

  describe('getSummaryData', () => {
    it('returns an object with all data needed to fill pdf of summary report', () => {
      const { component } = setup('true');
      component.instance().updateDateForPath();
      const fakeGogenOutput =
        'Some output stuff &&&&&&{"noLongerHaveFelony": 6, "noConvictions": 3, "noConvictionsLast7": 7}';
      const result = component.instance().getSummaryData(fakeGogenOutput);
      expect(result).toEqual({
        dateTime: 'Jan 1 2011 0:00:00:AM',
        county: '',
        noLongerHaveFelony: 6,
        noConvictions: 3,
        noConvictionsLast7: 7
      });
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

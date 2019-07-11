import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ProgressBar, {
  PROCESSING_RATE,
  MAX_STEP_SIZE
} from '../../app/components/ProgressBar';
import sleep from '../../app/utils/testHelpers';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(fileSize = 1000) {
  const onCompleteCallbackSpy = sandbox.spy();
  const component = shallow(
    <ProgressBar
      fileSizeInBytes={fileSize}
      onCompleteCallback={onCompleteCallbackSpy}
      isComplete={false}
    />
  );
  return {
    component,
    onCompleteCallbackSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ProgressBar component', () => {
  describe('setup', () => {
    it('defaults the stepSize to the maximum if the computed stepSize would be > maximum', () => {
      const { component } = setup(PROCESSING_RATE / 100);
      expect(component.instance().state.stepSize).toEqual(MAX_STEP_SIZE);
    });

    it('uses the computed stepSize if the stepSize is <= maximum', () => {
      const { component } = setup(PROCESSING_RATE * 100);
      expect(component.instance().state.stepSize).toEqual(1);
    });

    it('initializes fill to zero', async () => {
      const { component } = setup();
      expect(component.instance().state.fill).toEqual(0);
    });
  });

  describe('tick', () => {
    it('increases fill by the stepSize amount', () => {
      const { component } = setup();
      const instance = component.instance();
      instance.tick();
      expect(instance.state.fill).toEqual(10);
      instance.tick();
      expect(instance.state.fill).toEqual(20);
    });
  });

  describe('lifecycle', () => {
    it('advances fill with the passage of time', async () => {
      const { component } = setup();
      expect(component.instance().state.fill).toEqual(0);
      await sleep(3);
      expect(component.instance().state.fill > 0).toBe(true);
    });
  });

  describe('termination', () => {
    describe('when fill is 100 but isComplete not set', () => {
      it('does not call the onCompleteCallback method', () => {
        const { component, onCompleteCallbackSpy } = setup();
        const instance = component.instance();

        for (let i = 0; i < 10; i += 1) {
          instance.tick();
        }
        expect(onCompleteCallbackSpy.called).toBe(false);
      });
    });

    describe('when fill is not 100 and isComplete is set', () => {
      it('does not call the onCompleteCallback method', () => {
        const { component, onCompleteCallbackSpy } = setup();
        const instance = component.instance();

        for (let i = 0; i < 3; i += 1) {
          instance.tick();
        }
        component.setProps({ isComplete: true });
        expect(onCompleteCallbackSpy.called).toBe(false);
      });
    });

    describe('when fill is 100 and isComplete is set', () => {
      it('calls the onCompleteCallback method', () => {
        const { component, onCompleteCallbackSpy } = setup();
        const instance = component.instance();

        component.setProps({ isComplete: true });
        instance.setState({ fill: 100 });
        instance.tick();
        expect(onCompleteCallbackSpy.called).toBe(true);
      });
    });
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

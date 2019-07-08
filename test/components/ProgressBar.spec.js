import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import ProgressBar, { PROCESSING_RATE } from '../../app/components/ProgressBar';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(fileSize = 1000) {
  const onCompleteSpy = sandbox.spy();
  const component = shallow(
    <ProgressBar fileSizeInBytes={fileSize} onComplete={onCompleteSpy} />
  );
  return {
    component,
    onCompleteSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

function sleep(seconds) {
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

describe('ProgressBar component', () => {
  describe('setup', () => {
    it('defaults the step if the file size is below the processing rate', () => {
      const { component } = setup(PROCESSING_RATE / 100);
      expect(component.instance().state.step).toEqual(10);
    });

    it('computes the step if the file size is above the processing rate', () => {
      const { component } = setup(PROCESSING_RATE * 100);
      expect(component.instance().state.step).toEqual(1);
    });

    it('initializes fill to zero', async () => {
      const { component } = setup();
      expect(component.instance().state.fill).toEqual(0);
    });
  });

  describe('tick', () => {
    it('increases fill by the step amount', () => {
      const { component } = setup();
      const instance = component.instance();
      instance.tick();
      expect(instance.state.fill).toEqual(10);
      instance.tick();
      expect(instance.state.fill).toEqual(20);
    });

    describe('when fill is 100', () => {
      it('calls the onComplete method', () => {
        const { component, onCompleteSpy } = setup();
        const instance = component.instance();

        for (let i = 0; i < 10; i += 1) {
          instance.tick();
        }
        expect(onCompleteSpy.called).toBe(true);
        expect(onCompleteSpy.callCount).toBe(1);
      });
    });

    describe('lifecycle', () => {
      it('advances fill with the passage of time', async () => {
        const { component } = setup();
        expect(component.instance().state.fill).toEqual(0);
        await sleep(3);
        expect(component.instance().state.fill).not.toBe(0);
      });
    });
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

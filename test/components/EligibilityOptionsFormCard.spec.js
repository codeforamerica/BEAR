import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import EligibilityOptionsFormCard from '../../app/components/EligibilityOptionsFormCard';
import BaselineEligibilityOption from '../../app/components/BaselineEligibilityOption';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const options = {
    '11357(a)': 'reduce',
    '11357(b)': 'dismiss',
    '11357(c)': 'reduce',
    '11357(d)': 'reduce',
    '11358': 'dismiss',
    '11359': 'reduce',
    '11360': 'dismiss'
  };

  const onOptionsConfirmSpy = sandbox.spy();
  const updateDateSpy = sandbox.spy();
  const onBackSpy = sandbox.spy();
  const component = mount(
    <EligibilityOptionsFormCard
      currentScreen={3}
      baselineEligibilityOptions={options}
      onOptionsConfirm={onOptionsConfirmSpy}
      updateDate={updateDateSpy}
      onBack={onBackSpy}
    />
  );
  return {
    options,
    component,
    onOptionsConfirmSpy,
    updateDateSpy,
    onBackSpy
  };
}
afterEach(() => {
  sandbox.restore();
});

describe('EligibilityOptionsFormCard component', () => {
  it('should render each option with the correct selection (dismiss or reduce)', () => {
    const { component } = setup('');
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11357(a)" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11357(b)" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11357(c)" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11357(d)" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11358" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11359" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption codeSection="11360" />
      ])
    ).toEqual(true);
  });

  describe('clicking the continue button', () => {
    it('should call updateDate once', () => {
      const { component, updateDateSpy } = setup('path/to/file');
      component.find('#continue').simulate('click');
      expect(updateDateSpy.called).toBe(true);
      expect(updateDateSpy.callCount).toEqual(1);
    });
    it('should call onOptionsConfirm once', () => {
      const { component, onOptionsConfirmSpy } = setup('path/to/file');
      component.find('#continue').simulate('click');
      expect(onOptionsConfirmSpy.called).toBe(true);
      expect(onOptionsConfirmSpy.callCount).toEqual(1);
    });
  });

  describe('clicking the go back button', () => {
    it('should call onBack once', () => {
      const { component, onBackSpy } = setup('path/to/file');
      component.find('#goback').simulate('click');
      expect(onBackSpy.called).toBe(true);
      expect(onBackSpy.callCount).toEqual(1);
    });
  });

  it('should match exact snapshot', () => {
    const options = { '11357(a)': 'dismiss' };
    const component = (
      <div>
        <EligibilityOptionsFormCard
          currentScreen={3}
          baselineEligibilityOptions={options}
        />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

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
    '0': { codeSection: '11357(a)', option: 'reduce' },
    '1': { codeSection: '11357(b)', option: 'dismiss' },
    '2': { codeSection: '11357(c)', option: 'reduce' },
    '3': { codeSection: '11357(d)', option: 'reduce' },
    '4': { codeSection: '11358', option: 'dismiss' },
    '5': { codeSection: '11359', option: 'reduce' },
    '6': { codeSection: '11360', option: 'dismiss' }
  };
  const onOptionsConfirmSpy = sandbox.spy();
  const onBackSpy = sandbox.spy();
  const component = mount(
    <EligibilityOptionsFormCard
      currentScreen={3}
      eligibilityOptions={options}
      onOptionsConfirm={onOptionsConfirmSpy}
      onBack={onBackSpy}
    />
  );
  return {
    component,
    onOptionsConfirmSpy,
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
        <BaselineEligibilityOption
          codeSection="11357(a)"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11357(b)"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11357(c)"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11357(d)"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11358"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11359"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="11360"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
  });

  describe('clicking the continue button', () => {
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
    const options = [{ codeSection: '11357(a)', option: 'dismiss' }];
    const component = (
      <div>
        <EligibilityOptionsFormCard
          currentScreen={3}
          eligibilityOptions={options}
        />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

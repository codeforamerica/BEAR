import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import EligibilityOptionsFormCard from '../../app/components/EligibilityOptionsFormCard';
import BaselineEligibilityOption from '../../app/components/BaselineEligibilityOption';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup() {
  const options = {
    hs11357a: 'dismiss',
    hs11357b: 'dismiss',
    hs11357c: 'reduce',
    hs11357d: 'dismiss',
    hs11358: 'dismiss',
    hs11359: 'dismiss',
    hs11360: 'reduce'
  };
  const component = shallow(
    <EligibilityOptionsFormCard
      currentScreen={3}
      eligibilityOptions={options}
    />
  );
  return {
    component
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
          codeSection="hs11357a"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11357b"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11357c"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11357d"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11358"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11359"
          selectedOption="dismiss"
        />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([
        <BaselineEligibilityOption
          codeSection="hs11360"
          selectedOption="reduce"
        />
      ])
    ).toEqual(true);
  });

  it('should match exact snapshot', () => {
    const options = {
      '11357a': 'dismiss'
    };
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

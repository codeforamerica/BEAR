import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import BaselineEligibilityOption from '../../app/components/BaselineEligibilityOption';
import RadioButton from '../../app/components/RadioButton';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const options = {
    '11357': 'dismiss',
    '11358': 'reduce'
  };
  const component1 = shallow(
    <BaselineEligibilityOption
      codeSection="11357"
      baselineEligibilityOptions={options}
    />
  );

  const component2 = shallow(
    <BaselineEligibilityOption
      codeSection="11358"
      baselineEligibilityOptions={options}
    />
  );
  return {
    component1,
    component2
  };
}

describe('BaselineEligibilityOption component', () => {
  it('if dismissed, reduce should not be selected', () => {
    const { component1 } = setup();
    expect(
      component1.containsAnyMatchingElements([
        <RadioButton selected={true} value="dismiss" />
      ])
    ).toEqual(true);

    expect(
      component1.containsAnyMatchingElements([
        <RadioButton selected={false} value="reduce" />
      ])
    ).toEqual(true);
  });

  it('if reduced, dismiss should not be selected', () => {
    const { component2 } = setup();
    expect(
      component2.containsAnyMatchingElements([
        <RadioButton selected={true} value="reduce" />
      ])
    ).toEqual(true);

    expect(
      component2.containsAnyMatchingElements([
        <RadioButton selected={false} value="dismiss" />
      ])
    ).toEqual(true);
  });

  it('should match exact snapshot', () => {
    const { component1 } = setup();
    const tree = renderer.create(component1).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

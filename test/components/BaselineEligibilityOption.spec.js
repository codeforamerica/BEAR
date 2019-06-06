import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import BaselineEligibilityOption from '../../app/components/BaselineEligibilityOption';
import RadioButton from '../../app/components/RadioButton';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(selectedOption) {
  const component = shallow(
    <BaselineEligibilityOption
      codeSection="HS 11357 (a)"
      selectedOption={selectedOption}
    />
  );
  return {
    component
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('BaselineEligibilityOption component', () => {
  it('selects the correct radio button if dismiss is selected', () => {
    const { component } = setup('dismiss');
    expect(
      component.containsAnyMatchingElements([
        <RadioButton selected={true} value="dismiss" />
      ])
    ).toEqual(true);

    expect(
      component.containsAnyMatchingElements([<RadioButton value="reduce" />])
    ).toEqual(true);
  });

  it('selects the correct radio button if reduce is selected', () => {
    const { component } = setup('reduce');
    expect(
      component.containsAnyMatchingElements([
        <RadioButton selected value="reduce" />
      ])
    ).toEqual(true);
    expect(
      component.containsAnyMatchingElements([<RadioButton value="dismiss" />])
    ).toEqual(true);
  });

  it('should match exact snapshot', () => {
    const { component } = setup('dismiss');
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

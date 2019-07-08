import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import NumberSelect from '../../app/components/NumberSelect';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const onNumberSelectSpy = sandbox.spy();
  const component = shallow(
    <NumberSelect
      onNumberSelect={onNumberSelectSpy}
      group="age"
      minNumber={1}
      maxNumber={3}
    />
  );
  return {
    component,
    onNumberSelectSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('NumberSelect component', () => {
  it('selecting a number should call onNumberSelect with numeric value', () => {
    const { component, onNumberSelectSpy } = setup();
    const ageSelect = component.find('#age-select');
    const fakeEvent = {
      currentTarget: {
        value: '3',
        selectedOptions: [{ text: '3' }]
      }
    };
    ageSelect.simulate('change', fakeEvent);
    expect(onNumberSelectSpy.called).toBe(true);
    expect(onNumberSelectSpy.args[0][1]).toEqual(3);
  });

  it('should populate dropdown with numbers between max and min', () => {
    const { component } = setup();
    const ageSelect = component.find('#age-select');
    const ageOptions = ageSelect.find('option').map(opt => {
      return opt.props().value;
    });
    expect(ageOptions).toEqual([1, 2, 3]);
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

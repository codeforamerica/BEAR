import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RadioButton from '../../app/components/RadioButton';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup(selected) {
  const component = shallow(
    <RadioButton selected={selected} value="whatever" group="nihilists" />
  );
  return {
    component
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('RadioButton component', () => {
  it('is checked when selected is true', () => {
    const { component } = setup(true);
    expect(component.find('input').props().defaultChecked).toEqual(true);
  });

  it('is not checked when selected is false', () => {
    const { component } = setup(false);
    expect(component.find('input').props().defaultChecked).toEqual(false);
  });

  it('sets the name to the group prop', () => {
    const { component } = setup(false);
    expect(component.find('input').props().name).toEqual('nihilists');
  });

  it('constructs the id from the group and value', () => {
    const { component } = setup(false);
    expect(component.find('input').props().id).toEqual('whatever_nihilists');
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

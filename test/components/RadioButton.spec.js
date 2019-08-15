import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import RadioButton from '../../app/components/RadioButton';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(selected) {
  const onSelectSpy = sandbox.spy();
  const component = shallow(
    <RadioButton
      selected={selected}
      value="whatever"
      group="nihilists"
      onSelect={onSelectSpy}
    />
  );
  return {
    component,
    onSelectSpy
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

  it('calls onSelect with the group and value when button is clicked', () => {
    const { component, onSelectSpy } = setup(false);
    component.find('input').simulate('change');

    expect(onSelectSpy.called).toEqual(true);
    const { args } = onSelectSpy.getCall(0);
    expect(args[0]).toEqual('nihilists');
    expect(args[1]).toEqual('whatever');
  });

  it('should match exact snapshot when selected is false', () => {
    const { component } = setup(false);
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match exact snapshot when selected is true', () => {
    const { component } = setup(true);
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

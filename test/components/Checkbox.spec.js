import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import Checkbox from '../../app/components/Checkbox';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(checked) {
  const onChangeSpy = sandbox.spy();
  const component = shallow(
    <Checkbox
      labelText="Caterine Vauban"
      checked={checked}
      group="nihilists"
      onChange={onChangeSpy}
    >
      This is a checkbox
    </Checkbox>
  );
  return {
    component,
    onChangeSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('Checkbox component', () => {
  it('wraps the input in a label with proper class', () => {
    const { component } = setup(true);
    const label = component.find('label');
    expect(label.props().className).toContain('checkbox');
    expect(label.find('input').length).toBe(1);
  });

  it('renders a checkbox with value=true', () => {
    const { component } = setup(true);
    expect(component.find('input').props().value).toEqual(true);
  });

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
    expect(component.find('input').props().id).toEqual('true_nihilists');
  });

  it('calls onChange with the group and value when checkbox is clicked', () => {
    const { component, onChangeSpy } = setup();
    component.find('input').simulate('change');

    expect(onChangeSpy.called).toEqual(true);
    const { args } = onChangeSpy.getCall(0);
    expect(args[0]).toEqual('nihilists');
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

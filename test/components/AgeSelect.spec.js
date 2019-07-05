import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AgeSelect from '../../app/components/AgeSelect';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const onAgeSelectSpy = sandbox.spy();
  const component = shallow(
    <AgeSelect onAgeSelect={onAgeSelectSpy} minAge={1} maxAge={3} />
  );
  return {
    component,
    onAgeSelectSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('AgeSelect component', () => {
  it('selecting age should call onAgeSelect with numeric value', () => {
    const { component, onAgeSelectSpy } = setup();
    const ageSelect = component.find('#age-select');
    const fakeEvent = {
      currentTarget: {
        value: '3',
        selectedOptions: [{ text: '3' }]
      }
    };
    ageSelect.simulate('change', fakeEvent);
    expect(onAgeSelectSpy.called).toBe(true);
    expect(onAgeSelectSpy.args[0][0]).toEqual(3);
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

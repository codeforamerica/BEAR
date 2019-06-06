import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import CountySelect from '../../app/components/CountySelect';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const onCountySelectSpy = sandbox.spy();
  const component = shallow(
    <CountySelect onCountySelect={onCountySelectSpy} />
  );
  return {
    component,
    onCountySelectSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('CountySelect component', () => {
  it('selecting county should call onCountySelect with county name and value', () => {
    const { component, onCountySelectSpy } = setup();
    const countySelect = component.find('#county-select');
    const fakeEvent = {
      currentTarget: {
        value: 'CONTRA COSTA',
        selectedOptions: [{ text: 'Contra Costa' }]
      }
    };
    countySelect.simulate('change', fakeEvent);
    expect(onCountySelectSpy.called).toBe(true);
    expect(onCountySelectSpy.args[0][0]).toEqual({
      name: 'Contra Costa',
      code: 'CONTRA COSTA'
    });
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

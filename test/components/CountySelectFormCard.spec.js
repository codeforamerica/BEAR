import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import CountySelectFormCard from '../../app/components/CountySelectFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup() {
  const fakeOnCountySelect = sandbox.spy();
  const fakeOnCountyConfirm = sandbox.spy();
  const component = shallow(
    <CountySelectFormCard
      screenNumber={1}
      currentScreen={1}
      onCountySelect={fakeOnCountySelect}
      onCountyConfirm={fakeOnCountyConfirm}
    />
  );
  return {
    component,
    fakeOnCountySelect,
    fakeOnCountyConfirm
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('CountySelectFormCard component', () => {
  describe('clicking the Continue button', () => {
    it('should call the onCountyConfirm function with the next screen number', () => {
      const { component, fakeOnCountyConfirm } = setup();
      const continueButton = component.find('button').at(0);
      continueButton.simulate('click');
      expect(fakeOnCountyConfirm.called).toBe(true);
      const { args } = fakeOnCountyConfirm.getCall(0);
      expect(args[0]).toEqual(2);
    });
  });

  it('should match exact snapshot', () => {
    const component = (
      <div>
        <CountySelectFormCard currentScreen={1} />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

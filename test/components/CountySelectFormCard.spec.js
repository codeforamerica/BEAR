import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import CountySelectFormCard from '../../app/components/CountySelectFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(selectedCounty) {
  const fakeOnCountySelect = sandbox.spy();
  const fakeOnCountyConfirm = sandbox.spy();
  const component = mount(
    <CountySelectFormCard
      selectedCounty={selectedCounty}
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
  describe('clicking the Continue button when county has been selected', () => {
    it('should call the onCountyConfirm function with the next screen number', () => {
      const county = { name: 'Alameda', code: 'ALAMEDA' };
      const { component, fakeOnCountyConfirm } = setup(county);
      const continueButton = component.find('button').at(0);
      continueButton.simulate('click');
      expect(fakeOnCountyConfirm.called).toBe(true);
      expect(fakeOnCountyConfirm.callCount).toEqual(1);
      expect(component.find('select').props().value).toBe('ALAMEDA');
    });
  });

  describe('clicking the Continue button when county has NOT been selected', () => {
    it('should NOT call the onCountyConfirm function ', () => {
      const defaultCounty = { name: '', code: '' };
      const { component, fakeOnCountyConfirm } = setup(defaultCounty);
      const continueButton = component.find('button').at(0);
      continueButton.simulate('click');
      expect(fakeOnCountyConfirm.called).toBe(false);
      expect(component.find('select').props().value).toBe('');
    });
  });

  it('should match exact snapshot', () => {
    const defaultCounty = { name: '', code: '' };

    const component = (
      <div>
        <CountySelectFormCard selectedCounty={defaultCounty} />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

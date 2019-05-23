import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import FormCard from '../../app/components/FormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup(screenNumber, currentScreen) {
  const component = shallow(
    <FormCard screenNumber={screenNumber} currentScreen={currentScreen} />
  );
  return {
    component
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('FormCard component', () => {
  describe('conditional rendering', () => {
    it('should render the component if the screen number equals the current screen', () => {
      const { component } = setup(1, 1);
      expect(component.html()).toEqual('<div class="form-card"></div>');
    });

    it('should render null if the screen number does NOT equal the current screen', () => {
      const { component } = setup(1, 2);
      expect(component.html()).toEqual(null);
    });
  });
});

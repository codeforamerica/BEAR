import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import FormCardHeader from '../../app/components/FormCardHeader';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(helpText) {
  const component = shallow(<FormCardHeader helpText={helpText} />);
  return { component };
}

afterEach(() => {
  sandbox.restore();
});

describe('FormCardHeader component', () => {
  it('should match exact snapshot', () => {
    const component = (
      <div>
        <FormCardHeader>Hello! This is a title.</FormCardHeader>
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe('with optional helper text', () => {
    it('displays the help text', () => {
      const { component } = setup('my help text');
      const helpDiv = component.find('.text--help');

      expect(helpDiv.text()).toEqual('my help text');
    });

    it('should match exact snapshot', () => {
      const component = (
        <div>
          <FormCardHeader helpText="this is some helper text">
            Hello! This is a title.
          </FormCardHeader>
        </div>
      );

      const tree = renderer.create(component).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

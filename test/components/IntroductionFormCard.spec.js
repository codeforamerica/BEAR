import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import IntroductionFormCard from '../../app/components/IntroductionFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const onBeginSpy = sandbox.spy();
  const component = shallow(<IntroductionFormCard onBegin={onBeginSpy} />);
  return { component, onBeginSpy };
}

afterEach(() => {
  sandbox.restore();
});

describe('IntroductionFormCard component', () => {
  describe('clicking the "Got it!" button', () => {
    it('calls the onBegin function', () => {
      const { component, onBeginSpy } = setup();
      const beginButton = component.find('#begin');
      beginButton.simulate('click');
      expect(onBeginSpy.called).toBe(true);
      expect(onBeginSpy.callCount).toEqual(1);
    });
  });

  it('should match exact snapshot', () => {
    const component = (
      <div>
        <IntroductionFormCard />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ContinueButton from '../../app/components/ContinueButton';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

afterEach(() => {
  sandbox.restore();
});

describe('ContinueButton component', () => {
  it('can be enabled', () => {
    const component = shallow(
      <ContinueButton onContinue={() => {}} disabled={false} />
    );

    expect(component.find('button').props().disabled).toBe(false);
    expect(component.find('button').props().className).not.toContain(
      'button--disabled'
    );
  });

  it('can be disabled', () => {
    const component = shallow(
      <ContinueButton onContinue={() => {}} disabled={true} />
    );

    expect(component.find('button').props().disabled).toBe(true);
    expect(component.find('button').props().className).toContain(
      'button--disabled'
    );
  });
});

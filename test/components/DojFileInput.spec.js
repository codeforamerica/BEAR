import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DojFileInput from '../../app/components/DojFileInput';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const onFileSelectSpy = sandbox.spy();
  const component = shallow(<DojFileInput onFileSelect={onFileSelectSpy} />);
  return {
    component,
    onFileSelectSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('DojFileInput component', () => {
  it('selecting file should call onFileSelect with file path', () => {
    const { component, onFileSelectSpy } = setup();
    const fileInput = component.find('#doj-file-input');
    const fakeEvent = {
      currentTarget: {
        files: [{ path: 'path/to/file' }]
      }
    };
    fileInput.simulate('change', fakeEvent);
    expect(onFileSelectSpy.called).toBe(true);
    const { args } = onFileSelectSpy.getCall(0);
    expect(args[0]).toEqual('path/to/file');
  });

  it('should match exact snapshot', () => {
    const { component } = setup();
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

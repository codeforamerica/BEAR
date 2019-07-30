import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DojFileItem from '../../app/components/DojFileItem';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(filePath) {
  const onFileRemoveSpy = sandbox.spy();
  const component = shallow(
    <DojFileItem filePath={filePath} onFileRemove={onFileRemoveSpy} />
  );
  return {
    component,
    onFileRemoveSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('DojFileItem component', () => {
  it('should display the file name from path', () => {
    const { component } = setup('path/to/file.dat');
    const fileName = component.find('.fileName');
    expect(fileName.text()).toEqual('File imported: file.dat');
  });

  it('should call onFileRemove with the clicked path when the close icon is clicked', () => {
    const { component, onFileRemoveSpy } = setup('path/to/file.dat');
    component.find('.icon-close').simulate('click');
    expect(onFileRemoveSpy.called).toBe(true);
    const { args } = onFileRemoveSpy.getCall(0);
    expect(args[0]).toEqual('path/to/file.dat');
  });

  it('should match exact snapshot', () => {
    const { component } = setup('path/to/file');
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

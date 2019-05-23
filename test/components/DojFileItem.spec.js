import sinon from 'sinon';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DojFileItem from '../../app/components/DojFileItem';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup(filePath) {
  const component = shallow(<DojFileItem filePath={filePath} />);
  return {
    component
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('DojFileItem component', () => {
  it('should display only the file name from path', () => {
    const { component } = setup('path/to/file.dat');
    const fileName = component.find('.fileName');
    expect(fileName.text()).toEqual('file.dat');
  });

  it('should match exact snapshot', () => {
    const { component } = setup('path/to/file');
    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

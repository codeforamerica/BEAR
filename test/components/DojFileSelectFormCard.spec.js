import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DojFileSelectFormCard from '../../app/components/DojFileSelectFormCard';
import ContinueButton from '../../app/components/ContinueButton';
import DojFileItem from '../../app/components/DojFileItem';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(dojFilePaths) {
  const fakeUpdateFilePath = sandbox.spy();
  const onFileConfirmSpy = sandbox.spy();
  const onBackSpy = sandbox.spy();
  const component = mount(
    <DojFileSelectFormCard
      currentScreen={2}
      updateFilePath={fakeUpdateFilePath}
      onFileConfirm={onFileConfirmSpy}
      dojFilePaths={dojFilePaths}
      onBack={onBackSpy}
    />
  );
  return {
    component,
    onFileConfirmSpy,
    onBackSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('DojFileSelectFormCard component', () => {
  describe('the Continue button', () => {
    it('should appear as disabled if the file path is empty', () => {
      const { component } = setup([]);
      expect(component.find('ContinueButton').props().disabled).toEqual(true);
    });

    it('should appear if the file path is not empty', () => {
      const { component } = setup(['path/to/file']);
      expect(
        component.containsAnyMatchingElements([<ContinueButton />])
      ).toEqual(true);
    });
  });

  describe('the file name', () => {
    it('should not appear if the file path is empty', () => {
      const { component } = setup([]);
      expect(component.containsAnyMatchingElements([<DojFileItem />])).toEqual(
        false
      );
    });

    it('should appear if the file path is not empty', () => {
      const { component } = setup(['path/to/file']);
      expect(component.containsAnyMatchingElements([<DojFileItem />])).toEqual(
        true
      );
    });
  });

  describe('clicking the continue button', () => {
    it('should call onFileConfirm with the next screen number', () => {
      const { component, onFileConfirmSpy } = setup(['path/to/file']);
      component.find('#continue').simulate('click');
      expect(onFileConfirmSpy.called).toBe(true);
      expect(onFileConfirmSpy.callCount).toEqual(1);
    });
  });

  describe('clicking the go back button', () => {
    it('should call onFileConfirm with the previous screen number', () => {
      const { component, onBackSpy } = setup(['path/to/file']);
      component.find('#goback').simulate('click');
      expect(onBackSpy.called).toBe(true);
      expect(onBackSpy.callCount).toEqual(1);
    });
  });

  it('should match exact snapshot when file has not been selected', () => {
    const component = (
      <div>
        <DojFileSelectFormCard currentScreen={2} dojFilePaths={[]} />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match exact snapshot when file has been selected', () => {
    const component = (
      <div>
        <DojFileSelectFormCard
          currentScreen={2}
          dojFilePaths={['path/to/file']}
        />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

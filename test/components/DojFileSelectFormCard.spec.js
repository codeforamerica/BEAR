import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import DojFileSelectFormCard from '../../app/components/DojFileSelectFormCard';
import ContinueButton from '../../app/components/ContinueButton';
import DojFileItem from '../../app/components/DojFileItem';
import DojFileInput from '../../app/components/DojFileInput';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.sandbox.create();

function setup(dojFilePath) {
  const fakeUpdateFilePath = sandbox.spy();
  const onFileConfirmSpy = sandbox.spy();
  const component = mount(
    <DojFileSelectFormCard
      currentScreen={2}
      updateFilePath={fakeUpdateFilePath}
      onFileConfirm={onFileConfirmSpy}
      dojFilePath={dojFilePath}
    />
  );
  return {
    component,
    fakeUpdateFilePath,
    onFileConfirmSpy
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('DojFileSelectFormCard component', () => {
  describe('the Upload button', () => {
    it('should appear if the file path is empty', () => {
      const { component } = setup('');
      expect(component.containsAnyMatchingElements([<DojFileInput />])).toEqual(
        true
      );
    });

    it('should NOT appear if the file path is not empty', () => {
      const { component } = setup('path/to/file');
      expect(component.containsAnyMatchingElements([<DojFileInput />])).toEqual(
        false
      );
    });
  });

  describe('the Continue button', () => {
    it('should not appear if the file path is empty', () => {
      const { component } = setup('');
      expect(
        component.containsAnyMatchingElements([<ContinueButton />])
      ).toEqual(false);
    });

    it('should appear if the file path is not empty', () => {
      const { component } = setup('path/to/file');
      expect(
        component.containsAnyMatchingElements([<ContinueButton />])
      ).toEqual(true);
    });
  });

  describe('the file name', () => {
    it('should not appear if the file path is empty', () => {
      const { component } = setup('');
      expect(component.containsAnyMatchingElements([<DojFileItem />])).toEqual(
        false
      );
    });

    it('should appear if the file path is not empty', () => {
      const { component } = setup('path/to/file');
      expect(component.containsAnyMatchingElements([<DojFileItem />])).toEqual(
        true
      );
    });
  });

  describe('clicking the continue button', () => {
    it('should call onFileConfirm with the next screen number', () => {
      const { component, onFileConfirmSpy } = setup('path/to/file');
      component.find('.button').simulate('click');
      expect(onFileConfirmSpy.called).toBe(true);
      const { args } = onFileConfirmSpy.getCall(0);
      expect(args[0]).toEqual(3);
    });
  });

  it('should match exact snapshot when file has not been selected', () => {
    const component = (
      <div>
        <DojFileSelectFormCard currentScreen={2} dojFilePath="" />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('should match exact snapshot when file has been selected', () => {
    const component = (
      <div>
        <DojFileSelectFormCard currentScreen={2} dojFilePath="path/to/file" />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

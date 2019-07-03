import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import renderer from 'react-test-renderer';
import AdditionalReliefFormCard from '../../app/components/AdditionalReliefFormCard';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup() {
  const options = { subjectUnder21AtConviction: true };

  const onOptionsConfirmSpy = sandbox.spy();
  const onOptionChangeSpy = sandbox.spy();
  const updateDateSpy = sandbox.spy();
  const onBackSpy = sandbox.spy();
  const component = mount(
    <AdditionalReliefFormCard
      additionalReliefOptions={options}
      onEligibilityOptionSelect={onOptionChangeSpy}
      onOptionsConfirm={onOptionsConfirmSpy}
      updateDate={updateDateSpy}
      onBack={onBackSpy}
    />
  );
  return {
    options,
    component,
    onOptionChangeSpy,
    onOptionsConfirmSpy,
    updateDateSpy,
    onBackSpy
  };
}
afterEach(() => {
  sandbox.restore();
});

describe('AdditionalReliefFormCard component', () => {
  describe('clicking the continue button', () => {
    it('should call onOptionsConfirm once', () => {
      const { component, onOptionsConfirmSpy } = setup();
      component.find('#continue').simulate('click');
      expect(onOptionsConfirmSpy.called).toBe(true);
      expect(onOptionsConfirmSpy.callCount).toEqual(1);
    });
    it('should call updateDate once', () => {
      const { component, updateDateSpy } = setup('path/to/file');
      component.find('#continue').simulate('click');
      expect(updateDateSpy.called).toBe(true);
      expect(updateDateSpy.callCount).toEqual(1);
    });
  });

  describe('clicking the go back button', () => {
    it('should call onBack once', () => {
      const { component, onBackSpy } = setup();
      component.find('#goback').simulate('click');
      expect(onBackSpy.called).toBe(true);
      expect(onBackSpy.callCount).toEqual(1);
    });
  });

  describe('clicking the checkbox for convictions that occurred when under 21', () => {
    it('should call onOptionChange with the correct arguments', () => {
      const { component, onOptionChangeSpy } = setup();
      expect(
        component.props().additionalReliefOptions.subjectUnder21AtConviction
      ).toEqual(true);
      component.find('#dismiss_under_21').simulate('change');
      expect(onOptionChangeSpy.called).toBe(true);
      expect(onOptionChangeSpy.callCount).toEqual(1);
      const { args } = onOptionChangeSpy.getCall(0);
      expect(args[0]).toEqual('subjectUnder21AtConviction');
      expect(args[1]).toEqual(false);
    });
  });

  it('should match exact snapshot', () => {
    const options = { subjectUnder21AtConviction: true };
    const component = (
      <div>
        <AdditionalReliefFormCard additionalReliefOptions={options} />
      </div>
    );

    const tree = renderer.create(component).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

import sinon from 'sinon';
import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorFormCard from '../../app/components/ErrorFormCard';
import ErrorSection from '../../app/components/ErrorSection';

Enzyme.configure({ adapter: new Adapter() });
const sandbox = sinon.createSandbox();

function setup(errorData) {
  const component = mount(
    <ErrorFormCard errorText={JSON.stringify(errorData)} />
  );
  return {
    component
  };
}

afterEach(() => {
  sandbox.restore();
});

describe('ErrorFormCard component', () => {
  describe('Displays errors', () => {
    it('should show Parsing title for parsing errors', () => {
      const { component } = setup({
        file_1: {
          ExitCode: 2,
          ErrorMessage: 'record on line 2: wrong number of fields'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Parsing" />
        ])
      ).toEqual(true);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Non Parsing" />
        ])
      ).toEqual(false);
    });

    it('should show Non Parsing title for non-parsing errors', () => {
      const { component } = setup({
        file_1: {
          ExitCode: 1,
          ErrorMessage: 'Cannot open file'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Parsing" />
        ])
      ).toEqual(false);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Non Parsing" />
        ])
      ).toEqual(true);
    });

    it('should show both Parsing & Non Parsing titles for mixed errors', () => {
      const { component } = setup({
        file_1: {
          ExitCode: 1,
          ErrorMessage: 'Cannot open file'
        },
        file_2: {
          ExitCode: 2,
          ErrorMessage: 'record on line 2: wrong number of fields'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Parsing" />
        ])
      ).toEqual(true);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection title="Non Parsing" />
        ])
      ).toEqual(true);
    });
  });
});

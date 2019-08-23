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
    it('should show Parsing header for parsing errors', () => {
      const { component } = setup({
        file_1: {
          errorType: 'PARSING',
          errorMessage: 'record on line 2: wrong number of fields'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We were not able to read the following files. Please download the original DOJ files and try again." />
        ])
      ).toEqual(true);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We encountered the following errors:" />
        ])
      ).toEqual(false);
    });

    it('should show Non Parsing header for non-parsing errors', () => {
      const { component } = setup({
        file_1: {
          errorType: 'OTHER',
          errorMessage: 'Cannot open file'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We were not able to read the following files. Please download the original DOJ files and try again." />
        ])
      ).toEqual(false);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We encountered the following errors:" />
        ])
      ).toEqual(true);
    });

    it('should show both Parsing & Non Parsing titles for mixed errors', () => {
      const { component } = setup({
        file_1: {
          errorType: 'OTHER',
          errorMessage: 'Cannot open file'
        },
        file_2: {
          errorType: 'PARSING',
          errorMessage: 'record on line 2: wrong number of fields'
        }
      });
      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We were not able to read the following files. Please download the original DOJ files and try again." />
        ])
      ).toEqual(true);

      expect(
        component.containsAnyMatchingElements([
          <ErrorSection header="We encountered the following errors:" />
        ])
      ).toEqual(true);
    });
  });
});

import { formatLineCountWithCommas } from '../../app/utils/formatSummaryOutputUtils';

describe('formatLineCountWithCommas', () => {
  describe('when the input number is greater than 1000', () => {
    it('returns the input number with commas added', () => {
      expect(formatLineCountWithCommas(1000)).toEqual('1,000');
      expect(formatLineCountWithCommas(10000)).toEqual('10,000');
    });
  });
  describe('when the input number is less than 1000', () => {
    it('returns the input number without commas added', () => {
      expect(formatLineCountWithCommas(999)).toEqual('999');
    });
  });
});

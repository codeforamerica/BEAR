import {
  formatLineCountWithCommas,
  formattedProcessingTime
} from '../../app/utils/formatSummaryOutputUtils';

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

describe('formattedProcessingTime', () => {
  describe('time is 90 seconds or over', () => {
    it('should return time in minutes, rounded to tenth', () => {
      expect(formattedProcessingTime(91.33458)).toEqual('1.5 minutes');
    });
  });

  describe('time is under 90 seconds', () => {
    it('should return time in seconds, rounded to tenth', () => {
      expect(formattedProcessingTime(11.33458)).toEqual('11.3 seconds');
    });
  });
});

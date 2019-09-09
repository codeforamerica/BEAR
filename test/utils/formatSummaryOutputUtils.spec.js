import {
  formatLineCountWithCommas,
  formattedProcessingTime,
  convertTimestamp
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

  describe('time is under 10 seconds and more than 1 second', () => {
    it('should return time in seconds, rounded to one decimal place', () => {
      expect(formattedProcessingTime(9.10001)).toEqual('9.1 seconds');
    });
  });

  describe('time is under 1 second', () => {
    it('should return time in seconds, rounded to 3 decimal places', () => {
      expect(formattedProcessingTime(0.001543)).toEqual('0.002 seconds');
    });
  });
});

describe('convertTimestamp', () => {
  it('it should return a human readable date', () => {
    const stringDate = convertTimestamp('1979-06-01T00:00:00Z');
    expect(stringDate).toEqual('June 1, 1979');
  });
});

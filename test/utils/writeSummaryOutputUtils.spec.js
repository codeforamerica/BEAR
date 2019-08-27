import { allEligibleConvictionsDismissed } from '../../app/utils/writeSummaryOutputUtils';

describe('allEligibleConvictionsDismissed', () => {
  describe('when baseline eligibility specifies to dismiss all', () => {
    it('returns true', () => {
      const transformedEligibilityOptions = {
        baselineEligibility: { dismiss: ['11357'], reduce: [] }
      };
      expect(
        allEligibleConvictionsDismissed(transformedEligibilityOptions)
      ).toEqual(true);
    });
  });

  describe('when baseline eligibility specifies to reduce at least one code', () => {
    it('returns false', () => {
      const transformedEligibilityOptions = {
        baselineEligibility: { dismiss: [], reduce: ['11357'] }
      };
      expect(
        allEligibleConvictionsDismissed(transformedEligibilityOptions)
      ).toEqual(false);
    });
  });
});

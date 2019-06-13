import transformEligibilityOptions from '../../app/utils/gogenUtils';

describe('transformEligibilityOptions', () => {
  it('formats the eligibility options for the json file', () => {
    const optionState = {
      '0': { codeSection: '11357(a)', option: 'dismiss' },
      '1': { codeSection: '11357(b)', option: 'dismiss' },
      '2': { codeSection: '11357(c)', option: 'reduce' },
      '3': { codeSection: '11357(d)', option: 'dismiss' },
      '4': { codeSection: '11358', option: 'dismiss' },
      '5': { codeSection: '11359', option: 'reduce' },
      '6': { codeSection: '11360', option: 'reduce' }
    };
    const subject = transformEligibilityOptions(optionState);
    expect(subject).toEqual({
      dismiss: ['11357(A)', '11357(B)', '11357(D)', '11358'],
      reduce: ['11357(C)', '11359', '11360']
    });
  });
});

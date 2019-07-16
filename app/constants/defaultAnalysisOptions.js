const defaultAnalysisOptions = {
  currentScreen: 0,
  county: { name: '', code: '' },
  dojFilePath: '',
  baselineEligibilityOptions: {
    '11357(a)': 'dismiss',
    '11357(b)': 'dismiss',
    '11357(c)': 'dismiss',
    '11357(d)': 'dismiss',
    '11358': 'dismiss',
    '11359': 'dismiss',
    '11360': 'dismiss'
  },
  additionalReliefOptions: {
    subjectUnder21AtConviction: true,
    dismissOlderThanAgeThreshold: true,
    subjectAgeThreshold: 40,
    dismissYearsSinceConvictionThreshold: true,
    yearsSinceConvictionThreshold: 5,
    dismissYearsCrimeFreeThreshold: true,
    yearsCrimeFreeThreshold: 5,
    subjectHasOnlyProp64Charges: true
  }
};

export default defaultAnalysisOptions;

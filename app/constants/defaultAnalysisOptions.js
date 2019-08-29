const defaultAnalysisOptions = {
  currentScreen: 0,
  previousScreenInFlow: 0,
  county: { name: '', code: '' },
  baselineEligibilityOptions: {
    '11357': 'dismiss',
    '11358': 'dismiss',
    '11359': 'dismiss',
    '11360': 'dismiss'
  },
  additionalReliefOptions: {
    subjectUnder21AtConviction: false,
    dismissOlderThanAgeThreshold: false,
    subjectAgeThreshold: 0,
    dismissYearsSinceConvictionThreshold: true,
    yearsSinceConvictionThreshold: 5,
    dismissYearsCrimeFreeThreshold: true,
    yearsCrimeFreeThreshold: 5,
    subjectHasOnlyProp64Charges: true,
    subjectIsDeceased: false
  },
  impactStatistics: {
    noFelony: 0,
    noConvictionLast7: 0,
    noConviction: 0
  }
};

export default defaultAnalysisOptions;

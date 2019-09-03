declare type ApplicationState = {
  gogenPath: string,
  formattedGogenRunTime: string,
  currentScreen: number,
  previousScreenInFlow: number,
  county: County,
  dojFilePaths: Array<string>,
  baselineEligibilityOptions: BaselineEligibilityOptions,
  additionalReliefOptions: AdditionalReliefOptions,
  impactStatistics: ImpactStatistics,
  outputPathPrefix: string,
  outputFilePath: string,
  errorText: string
};

declare type County = {
  name: string,
  code: string
};

declare type BaselineEligibilityOptions = { [string]: string };

declare type AdditionalReliefOptions = {
  dismissYearsSinceConvictionThreshold: boolean,
  yearsSinceConvictionThreshold: number,
  dismissYearsCrimeFreeThreshold: boolean,
  yearsCrimeFreeThreshold: number,
  subjectHasOnlyProp64Charges: boolean
};

declare type AdditionalReliefValue = number | boolean;

declare type EligibilityConfiguration = {
  baselineEligibility: {
    dismiss: Array<string>,
    reduce: Array<string>
  },
  additionalRelief: AdditionalReliefOptions
};

declare type ImpactStatistics = {
  noFelony: number,
  noConvictionLast7: number,
  noConviction: number
};

declare type GogenImpactStatistics = {
  CountSubjectsNoConviction: number,
  CountSubjectsNoConvictionLast7Years: number,
  CountSubjectsNoFelony: number
};

declare type GogenSummaryData = {
  county: string,
  earliestConviction: string,
  lineCount: number,
  processingTimeInSeconds: number,
  reliefWithCurrentEligibilityChoices: GogenImpactStatistics,
  reliefWithDismissAllProp64: GogenImpactStatistics,
  prop64ConvictionsCountInCountyByCodeSection: { [key: string]: number },
  subjectsWithProp64ConvictionCountInCounty: number,
  prop64FelonyConvictionsCountInCounty: number,
  prop64NonFelonyConvictionsCountInCounty: number,
  subjectsWithSomeReliefCount: number,
  convictionDismissalCountByCodeSection: { [key: string]: number },
  convictionReductionCountByCodeSection: { [key: string]: number },
  convictionDismissalCountByAdditionalRelief: { [key: string]: number }
};

declare type ErrorData = {
  errorType: string,
  errorMessage: string
};

declare type Errors = {
  [key: string]: ErrorData
};

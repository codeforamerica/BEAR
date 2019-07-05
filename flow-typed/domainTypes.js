declare type County = {
  name: string,
  code: string
};

declare type BaselineEligibilityOptions = { [string]: string };

declare type AdditionalReliefOptions = {
  subjectUnder21AtConviction: boolean,
  dismissOlderThanAgeThreshold: boolean,
  subjectAgeThreshold: number
};

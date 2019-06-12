declare type County = {
  name: string,
  code: string
};

declare type BaselineEligibilityOptions = { [string]: EligibilityOption };

declare type EligibilityOption = { codeSection: string, option: string };

// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';
import styles from './ResultsFormCard.css';

type Props = {
  county: County,
  outputFolder: string,
  openFolder: string => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

export default class ResultsFormCard extends Component<Props> {
  openResultsFolder = () => {
    const { openFolder, outputFolder } = this.props;
    openFolder(outputFolder);
  };

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  render() {
    const { county } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          <div className="text--centered">
            Your files are ready!
            <p>{`We have generated results for ${county.name} county`}</p>
            <button
              className="button button--primary"
              type="button"
              id="view_results"
              onClick={this.openResultsFolder}
            >
              Open Folder
            </button>
          </div>
        </FormCardHeader>
        <FormCardContent>
          <h3 className="text--centered">
            What&apos;s included in the folder:
          </h3>
          <div className={styles.sidePadding}>
            <p>
              <b>Full Results File: </b> CSV file of the original bulk data set
              with appended columns which display eligibility determinations and
              provide supporting information.
            </p>
          </div>
          <div className={styles.sidePadding}>
            <p>
              <b>Condensed Results Files: </b> CSV file with eligibility
              determinations and columns relevant for determining whether a
              conviction is eligible.
            </p>
          </div>
          <div className={styles.sidePadding}>
            <p>
              <b>Conviction Results File: </b> CSV file with only Prop 64
              convictions in the county of your choice.
            </p>
          </div>
          <div className={styles.sidePadding}>
            <p>
              <b>Summary Report: </b> PDF document with eligibility criteria
              used to create results and summary statistics on how these results
              impact those with Prop 64 convictions.
            </p>
          </div>
        </FormCardContent>
        <FormCardFooter>
          <div className="text--centered">
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}

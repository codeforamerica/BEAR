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
  onStartOver: () => void
};

export default class ResultsFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openResultsFolder = () => {
    const { openFolder, outputFolder } = this.props;
    openFolder(outputFolder);
  };

  render() {
    const { county, onStartOver } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          <div className="text--centered">
            <div className={styles.completedIcon} />
            <h2 className={`${styles.resultsHeader} nudge--med`}>
              Your files are ready!
            </h2>
            <p
              className={styles.resultsSubheader}
            >{`We have generated results for ${county.name} County`}</p>
            <p className={styles.resultsSubheader}>
              Look for a folder on your desktop labeled
              &quot;Clear_My_Record_output&quot;. Within it will be a
              timestamped folder that will have all of your results files.
            </p>
            <button
              className="button button--primary nudge--small"
              type="button"
              id="view_results"
              onClick={this.openResultsFolder}
            >
              Open Folder
            </button>
          </div>
        </FormCardHeader>
        <FormCardContent>
          <h3 className={`${styles.contentListTitle} text--centered`}>
            What&apos;s included in the folder:
          </h3>
          <div className={styles.contentsListContainer}>
            <ol className={styles.contentsList}>
              <li>Summary Report</li>
              <li>Prop 64 Conviction Results</li>
              <li>All Results Condensed</li>
              <li>All Results</li>
            </ol>
            <p className={styles.contentsTableTitle}>
              What is included in each:
            </p>
          </div>
          <table className={`${styles.contentsTable} data-table`}>
            <thead>
              <tr>
                <th className={styles.fileColumn}>File Name</th>
                <th className={styles.columnsColumn}>
                  Columns from original DOJ file
                </th>
                <th className={styles.rowsColumn}>
                  Rows from original DOJ file
                </th>
                <th className={styles.supportingColumn}>
                  Supporting Clear My Record columns
                </th>
                <th className={styles.eligibilityColumn}>
                  Eligibility determination
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Prop 64 Convictions</td>
                <td>All</td>
                <td>Only Prop 64 convictions</td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
              </tr>
              <tr>
                <td>All Results Condensed</td>
                <td>Condensed for analysis</td>
                <td>All</td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
              </tr>
              <tr>
                <td>All Results</td>
                <td>All</td>
                <td>All</td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className="text--centered">
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
              </tr>
            </tbody>
          </table>
        </FormCardContent>
        <FormCardFooter className={styles.resultsFooter}>
          <div className="text--centered">
            <StartOverButton onStartOver={onStartOver} />
          </div>
        </FormCardFooter>
      </FormCard>
    );
  }
}

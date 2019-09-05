// @flow
import React, { Component } from 'react';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
// @flow
import StartOverButton from './StartOverButton';
import ImpactItem from './ImpactItem';
import styles from './ResultsFormCard.css';

type Props = {
  county: County,
  impactStatistics: ImpactStatistics,
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
    const { county, onStartOver, impactStatistics } = this.props;
    return (
      <FormCard>
        <FormCardHeader>
          <div className="text--centered">
            <div className={styles.completedIcon} />
            <h2 className={`${styles.resultsHeader} nudge--med`}>
              Your files are ready!
            </h2>
            <p className={`${styles.resultsSubheader}  nudge--small`}>
              {`We have generated results for ${county.name} County.`} Look for
              a folder on your desktop labeled
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
          <div className={styles.impactSection}>
            <h3 className={styles.subSectionTitle}>
              Based on your eligibility choices:
            </h3>
            <ImpactItem
              value={impactStatistics.noFelony}
              description="people will no longer have a felony on their CA record"
            />
            <ImpactItem
              value={impactStatistics.noConvictionLast7}
              description="people will no longer have a conviction on their CA record in the last 7 years"
            />
            <ImpactItem
              value={impactStatistics.noConviction}
              description="people will no longer have any conviction on their CA record"
            />
          </div>
          <div className={styles.sectionDivider} />
          <h3 className={`${styles.subSectionTitle} text--centered`}>
            What&apos;s included in the folder:
          </h3>
          <div className={styles.contentsListContainer}>
            <ol className={styles.contentsList}>
              <li>Summary Report</li>
              <li>Prop 64 Conviction Results</li>
              <li>All Results Condensed</li>
              <li>All Results</li>
            </ol>
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
                <td className={`${styles.supportingCheck} text--centered`}>
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className={`${styles.eligibilityCheck} text--centered`}>
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
              </tr>
              <tr>
                <td>All Results Condensed</td>
                <td>Condensed for analysis</td>
                <td>All</td>
                <td className={`${styles.supportingCheck} text--centered`}>
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className={`${styles.eligibilityCheck} text--centered`}>
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
              </tr>
              <tr>
                <td>All Results</td>
                <td>All</td>
                <td>All</td>
                <td className={`${styles.supportingCheck} text--centered`}>
                  <div className="emoji emoji--big emoji--checkmark" />
                </td>
                <td className={`${styles.eligibilityCheck} text--centered`}>
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

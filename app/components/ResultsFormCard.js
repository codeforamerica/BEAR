// @flow
import React, { Component } from 'react';
import path from 'path';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';
import styles from './ResultsFormCard.css';
import EmojiMediaBox from './EmojiMediaBox';

type Props = {
  county: County,
  outputFolder: string,
  showFileInFolder: string => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

export default class ResultsFormCard extends Component<Props> {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  openResultsFolder = () => {
    const { showFileInFolder, outputFolder } = this.props;
    showFileInFolder(path.join(outputFolder, 'Summary_Report.pdf'));
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
            <div className={styles.completedIcon} />
            <h2 className={`${styles.resultsHeader} nudge--med`}>
              Your files are ready!
            </h2>
            <p
              className={styles.resultsSubheader}
            >{`We have generated results for ${county.name} County`}</p>
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
            <p>What&apos;s included in the folder:</p>
          </h3>
          <EmojiMediaBox
            className={styles.sidePadding}
            emojiClass="emoji--memo"
            title="Summary Report"
            content="PDF document with eligibility criteria used to create results and summary statistics on how these results impact those with Prop 64 convictions."
          />
          <EmojiMediaBox
            className={styles.sidePadding}
            emojiClass="emoji--thumbs-up"
            title="Prop 64 Results"
            content="CSV file with only Prop 64 convictions in the county of your choice."
          />
          <EmojiMediaBox
            className={styles.sidePadding}
            emojiClass="emoji--pencil"
            title="All Results Condensed"
            content="CSV file with eligibility determinations and columns relevant for determining whether a conviction is eligible."
          />
          <EmojiMediaBox
            className={styles.sidePadding}
            emojiClass="emoji--page-facing-up"
            title="All Results"
            content="CSV file of the original bulk data set with appended columns which display eligibility determinations and provide supporting information."
          />
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

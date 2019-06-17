// @flow
import React, { Component } from 'react';

import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import StartOverButton from './StartOverButton';

type Props = {
  county: County,
  outputFolder: string,
  openFolder: string => void,
  onStartOver: void => void
};

export default class ResultsFormCard extends Component<Props> {
  openResultsFolder = () => {
    const { openFolder, outputFolder } = this.props;
    openFolder(outputFolder);
  };

  onClickStartOver = () => {
    const { onStartOver } = this.props;
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
          <div className="vertical-steps__step">
            <p>
              <b>Clear My Record Results Files: </b> Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. Nam sagittis sodales eleifend.
              Praesent in tincidunt turpis, id euismod enim. Integer a massa sed
              quam suscipit facilisis. Donec interdum placerat eros.
            </p>
          </div>
        </FormCardContent>
        <FormCardFooter>
          <StartOverButton onStartOver={this.onClickStartOver} />
        </FormCardFooter>
      </FormCard>
    );
  }
}

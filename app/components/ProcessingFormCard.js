// @flow
import React, { Component } from 'react';

import ReactPDF from '@react-pdf/renderer';
import FormCard, {
  FormCardContent,
  FormCardFooter,
  FormCardHeader
} from './FormCard';
import SummaryReportPdf from './SummaryReportPdf';
import ProgressBar from './ProgressBar';
import StartOverButton from './StartOverButton';
import { getFileSize } from '../utils/fileUtils';

type Props = {
  dojFilePaths: Array<string>,
  onComplete: void => void,
  runScriptInOptions: ((void) => void) => void,
  onStartOver: void => void,
  resetOutputPath: void => void
};

type State = {
  gogenComplete: boolean
};

export default class ProcessingFormCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      gogenComplete: false
    };
  }

  componentDidMount() {
    const { runScriptInOptions } = this.props;
    runScriptInOptions(this.onGogenComplete);
    window.scrollTo(0, 0);
  }

  onClickStartOver = () => {
    const { onStartOver, resetOutputPath } = this.props;
    resetOutputPath();
    onStartOver();
  };

  onGogenComplete = () => {
    this.setState({ gogenComplete: true });
  };

  calculateFileSizes = () => {
    const { dojFilePaths } = this.props;
    let totalSize = 0;
    dojFilePaths.forEach(path => {
      totalSize += getFileSize(path);
    });
    return totalSize;
  };

  render() {
    const { onComplete } = this.props;
    const { gogenComplete } = this.state;
    return (
      <FormCard>
        <FormCardHeader />
        <FormCardContent>
          <div className="box-wrapper text--centered">
            <div className="emoji emoji--huge emoji--woman-detective-medium-dark-skin-tone" />
            <h3>Reading and preparing files ...</h3>
            <ProgressBar
              fileSizeInBytes={this.calculateFileSizes()}
              onCompleteCallback={onComplete}
              isComplete={gogenComplete}
            />
            <StartOverButton onStartOver={this.onClickStartOver} />
          </div>
        </FormCardContent>
        <FormCardFooter />
      </FormCard>
    );
  }
}
ReactPDF.render(
  <SummaryReportPdf county="Yolo" dateTime="this is the date" />,
  `C:\\Users\\User1\\Desktop\\example.pdf`
);

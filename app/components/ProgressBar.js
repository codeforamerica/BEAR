// @flow
import React, { Component } from 'react';

type Props = {
  fileSizeInBytes: number,
  onCompleteCallback: (number, string) => void,
  isComplete: boolean,
  gogenExitCode: number,
  errorText: string
};

type State = {
  fill: number,
  stepSize: number
};

export const PROCESSING_RATE = 10000000;
export const MAX_STEP_SIZE = 10;
export const MAX_FILL = 100;

export default class ProgressBar extends Component<Props, State> {
  timerID: IntervalID;

  constructor(props: Props) {
    super(props);
    const { fileSizeInBytes } = this.props;
    const stepSize = (PROCESSING_RATE * MAX_FILL) / fileSizeInBytes;
    this.state = {
      fill: 0,
      stepSize: Math.min(MAX_STEP_SIZE, stepSize)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    const {
      isComplete,
      gogenExitCode,
      onCompleteCallback,
      errorText
    } = this.props;
    const { stepSize, fill } = this.state;
    if (gogenExitCode > 0) {
      onCompleteCallback(gogenExitCode, errorText);
      return;
    }
    if (isComplete) {
      if (fill === MAX_FILL) {
        clearInterval(this.timerID);
        onCompleteCallback(gogenExitCode, errorText);
        return;
      }
      if (stepSize !== MAX_FILL / MAX_STEP_SIZE) {
        this.setState({
          fill: MAX_FILL
        });
      }
    }
    this.setState(state => ({
      fill: Math.min(MAX_FILL, state.fill + state.stepSize)
    }));
  }

  render() {
    const { fill } = this.state;
    const percentage = Math.round(fill);
    return (
      <div className="box text--centered with-padding-large">
        <div className="progress-indicator">
          <div
            className="progress-indicator__bar"
            style={{ width: `${percentage}%` }}
          />
          <div className="progress-indicator__percentage">{percentage}%</div>
        </div>
      </div>
    );
  }
}

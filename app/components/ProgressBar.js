// @flow
import React, { Component } from 'react';

type Props = {
  fileSizeInBytes: number,
  onCompleteCallback: void => void,
  isComplete: boolean
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
    const { isComplete } = this.props;
    const { stepSize, fill } = this.state;
    if (isComplete) {
      if (fill === MAX_FILL) {
        clearInterval(this.timerID);
        const { onCompleteCallback } = this.props;
        onCompleteCallback();
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
    return <div> Fill: {Math.round(fill)} </div>;
  }
}

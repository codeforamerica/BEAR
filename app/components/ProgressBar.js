import React, { Component } from 'react';

type Props = {
  range: number,
  onComplete: void => void
};

const PROCESSING_RATE = 10000000;

export default class ProgressBar extends Component<Props> {
  constructor(props) {
    super(props);
    const { range } = this.props;
    const step = (PROCESSING_RATE * 100) / range;
    this.state = {
      fill: 0,
      step: Math.min(10, step)
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState(state => ({ fill: Math.min(100, state.fill + state.step) }));
    const { fill } = this.state;
    if (fill === 100) {
      clearInterval(this.timerID);
      const { onComplete } = this.props;
      onComplete();
    }
  }

  render() {
    const { fill } = this.state;
    return <div> Fill: {Math.round(fill)} </div>;
  }
}

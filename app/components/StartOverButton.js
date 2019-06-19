import React, { Component } from 'react';

type Props = {
  onStartOver: () => {}
};

export default class StartOverButton extends Component<Props> {
  render() {
    const { onStartOver } = this.props;
    return (
      <button
        className="button"
        onClick={onStartOver}
        type="button"
        id="start_over"
      >
        Start Over
      </button>
    );
  }
}

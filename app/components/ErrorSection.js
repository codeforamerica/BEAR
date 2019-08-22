import React, { Component } from 'react';

type Props = {
  title: string,
  errors: Object
};

const preStyle = {
  outline: 'auto thin',
  textAlign: 'left'
};

export default class ErrorSection extends Component<Props> {
  render() {
    const { title, errors } = this.props;
    return (
      <div>
        <h4> {title} </h4>
        <pre style={preStyle}>
          {Object.keys(errors).map(item => (
            <p key={item}>{`${item}: ${errors[item].ErrorMessage}`}</p>
          ))}
        </pre>
      </div>
    );
  }
}

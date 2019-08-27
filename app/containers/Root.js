// @flow
import React, { Component } from 'react';
import { spawn } from 'child_process';
import Home from '../components/Home';

type Props = {};

export default class Root extends Component<Props> {
  render() {
    const preserveEligibilityConfig =
      process.env.PRESERVE_ELIGIBILITY_CONFIG === 'true';
    return (
      <Home
        spawnChildProcess={spawn}
        preserveEligibilityConfig={preserveEligibilityConfig}
      />
    );
  }
}

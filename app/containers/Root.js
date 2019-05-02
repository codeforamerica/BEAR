// @flow
import React, { Component } from 'react';
import { spawn } from 'child_process';
import Home from '../components/Home';

type Props = {};

export default class Root extends Component<Props> {
  render() {
    return <Home spawnChildProcess={spawn} />;
  }
}

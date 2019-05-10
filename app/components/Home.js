// @flow
import React, { Component } from 'react';
import path from 'path';
import CountySelect from './CountySelect';
import FormCard, {
  FormCardHeader,
  FormCardContent,
  FormCardFooter
} from './FormCard';
import PageContainer from './PageContainer';

type Props = {
  spawnChildProcess: (
    path: string,
    options: Array<string>
  ) => child_process$ChildProcess // eslint-disable-line camelcase
};

type State = {
  gogenPath: string,
  county: County,
  dojFilePath: string,
  outputFilePath: string
};

export default class Home extends Component<Props, State> {
  runScript: () => void;

  updateCounty: (county: County) => void;

  constructor(props: Props) {
    super(props);

    let gogenPath;

    let home: string;
    let isPackaged: string;

    if (process.env.HOME != null) {
      home = process.env.HOME;
    } else {
      home = '';
      if (!process.env.IS_PACKAGED) {
        throw new Error('Home directory is null');
      }
    }
    if (process.env.IS_PACKAGED != null) {
      isPackaged = process.env.IS_PACKAGED;
    } else {
      isPackaged = '';
      throw new Error('IS_PACKAGED is null');
    }

    if (isPackaged !== 'false') {
      gogenPath = `${process.resourcesPath}${path.sep}gogen`;
    } else {
      gogenPath = `${home}/go/bin/gogen`;
    }

    this.state = {
      gogenPath,
      county: { name: '', code: '' },
      dojFilePath: `${home}/go/src/gogen/test_fixtures/sacramento/cadoj_sacramento.csv`,
      outputFilePath: `${home}/Desktop`
    };

    this.runScript = this.runScript.bind(this);
    this.updateCounty = this.updateCounty.bind(this);
  }

  runScript() {
    const { dojFilePath, county, outputFilePath, gogenPath } = this.state;

    const { spawnChildProcess } = this.props;

    const countyCode = county.code;

    const goProcess = spawnChildProcess(gogenPath, [
      `--input-doj=${dojFilePath}`,
      `--outputs=${outputFilePath}`,
      `--county="${countyCode}"`
    ]);

    goProcess.stdout.on('data', data => {
      console.log(`stdout: ${data}`);
    });

    goProcess.stderr.on('data', data => {
      console.log(`stderr: ${data}`);
    });

    goProcess.on('close', code => {
      console.log(`child process exited with code ${code}`);
    });
  }

  updateCounty = (county: County) => {
    this.setState({ county });
  };

  render() {
    return (
      <PageContainer>
        <FormCard>
          <FormCardHeader>Proposition 64 CA DOJ data upload</FormCardHeader>
          <FormCardContent>
            <CountySelect onCountySelect={this.updateCounty} />
          </FormCardContent>
          <FormCardFooter>
            <button
              className="button button--primary"
              onClick={this.runScript}
              type="button"
            >
              Continue <i className="icon-arrow_forward" />
            </button>
          </FormCardFooter>
        </FormCard>
      </PageContainer>
    );
  }
}

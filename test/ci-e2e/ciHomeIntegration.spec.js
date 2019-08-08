import fs from 'fs';
import sleep from '../../app/utils/testHelpers';
import { getDateTime } from '../../app/utils/fileUtils';
import { getOutputDirectoryPath, removeOutputDirectory } from '../e2e/helpers';

const { Application } = require('spectron');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

let outputDirectory;

describe('The happy path with additional relief', () => {
  let app;
  let pageTitle;

  beforeEach(() => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '../..')]
    });
    return app.start();
  });

  afterEach(() => {
    removeOutputDirectory(outputDirectory);
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('can complete the full flow and generate correct eligibility config', async () => {
    jest.setTimeout(30000);

    await app.client.click('#begin');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toContain('Baseline eligibility');

    await app.client.click('#reduce_11360');
    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toContain('Additional relief');

    const yearSelect = app.client.$('#yearsSinceConvictionThreshold-select');
    await yearSelect.selectByVisibleText('3');

    await app.client.click('#true_subjectHasOnlyProp64Charges');
    await app.client.click('#continue');

    outputDirectory = getOutputDirectoryPath(getDateTime());
    const eligibilityConfigFilePath = `${outputDirectory}/eligibilityConfig_${getDateTime()}.json`;

    const eligibilityConfigFileContents = fs.readFileSync(
      eligibilityConfigFilePath,
      'utf8'
    );
    const eligibilityConfig = JSON.parse(eligibilityConfigFileContents);

    expect(eligibilityConfig).toEqual({
      baselineEligibility: {
        dismiss: [
          '11357(a)',
          '11357(b)',
          '11357(c)',
          '11357(d)',
          '11357(no-sub-section)',
          '11358',
          '11359'
        ],
        reduce: ['11360']
      },
      additionalRelief: {
        subjectUnder21AtConviction: false,
        dismissOlderThanAgeThreshold: false,
        subjectAgeThreshold: 0,
        dismissYearsSinceConvictionThreshold: true,
        yearsSinceConvictionThreshold: 3,
        dismissYearsCrimeFreeThreshold: true,
        yearsCrimeFreeThreshold: 5,
        subjectHasOnlyProp64Charges: false,
        subjectIsDeceased: false
      }
    });

    const processingCardContent = await app.client.getText(
      '.form-card__content h3'
    );
    expect(processingCardContent).toContain('Reading and preparing files ...');

    await sleep(6);
    const resultsFormCardContent = await app.client.getText(
      '.form-card__title'
    );
    expect(resultsFormCardContent).toContain('Your files are ready!');
  });
});

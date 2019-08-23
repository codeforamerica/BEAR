import fs from 'fs';
import sleep from '../../app/utils/testHelpers';
import {
  getEligibilityConfigFilePath,
  getOutputDirectoryPath,
  removeOutputDirectory
} from './helpers';

const { Application } = require('spectron');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

let outputDirectory;

describe('The primary user flow', () => {
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

  it('does NOT continue to next screen if county is not selected', async () => {
    await app.client.click('#begin');

    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');
  });

  it('can select doj file and display the name', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    const fileName = await app.client.getText('.doj-file');
    expect(fileName).toEqual('File imported: file.dat');
  });

  it('can go back to the county select page', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');
  });

  it('can remove selected doj file', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('.icon-close');

    const fileName = await app.client.getText('#no-error-message');
    expect(fileName).toEqual('No file selected');
  });

  it('can go to the non-linear pages and then return to the main flow', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

    await app.client.click('#privacy');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Privacy Policy');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');

    await app.client.click('#faq');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toContain('Frequently asked questions');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');
  });

  it('can go to the terms of service page and then return to the main flow', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

    await app.client.click('#terms-of-service');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Terms of Service');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

    await app.client.click('#goback');

    pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');
  });

  describe('when the user chooses to dismiss all code sections', () => {
    it('skips additional relief page', async () => {
      const text = await app.client.getText('.form-card__content');
      expect(text).toContain('Using Clear My Record will expedite');

      await app.client.click('#begin');

      const countySelect = app.client.$('#county-select');
      await countySelect.selectByVisibleText('Sacramento');
      await app.client.click('#continue');

      await app.client.chooseFile(
        '#doj-file-input',
        './test/fixtures/file.dat'
      );
      await app.client.click('#continue');

      await app.client.click('#continue');
      outputDirectory = getOutputDirectoryPath();

      const pageBody = await app.client.getText('body');
      expect(pageBody).not.toContain('Additional relief');
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

      await app.client.chooseFile(
        '#doj-file-input',
        './test/fixtures/file.dat'
      );
      await app.client.click('#continue');

      pageTitle = await app.client.getText('.form-card__title');
      expect(pageTitle).toContain('Baseline eligibility');

      await app.client.click('#continue');

      outputDirectory = getOutputDirectoryPath();

      const eligibilityConfigFilePath = getEligibilityConfigFilePath();
      const eligibilityConfigFileContents = fs.readFileSync(
        eligibilityConfigFilePath,
        'utf8'
      );
      const eligibilityConfig = JSON.parse(eligibilityConfigFileContents);

      expect(eligibilityConfig).toEqual({
        baselineEligibility: {
          dismiss: ['11357', '11358', '11359', '11360'],
          reduce: []
        },
        additionalRelief: {
          subjectUnder21AtConviction: false,
          dismissOlderThanAgeThreshold: false,
          subjectAgeThreshold: 0,
          dismissYearsSinceConvictionThreshold: true,
          yearsSinceConvictionThreshold: 5,
          dismissYearsCrimeFreeThreshold: true,
          yearsCrimeFreeThreshold: 5,
          subjectHasOnlyProp64Charges: true,
          subjectIsDeceased: false
        }
      });

      const processingCardContent = await app.client.getText(
        '.form-card__content h3'
      );
      expect(processingCardContent).toContain(
        'Reading and preparing files ...'
      );

      await sleep(6);
      const resultsFormCardContent = await app.client.getText(
        '.form-card__title'
      );
      expect(resultsFormCardContent).toContain('Your files are ready!');

      const outputPdfFile = `${outputDirectory}/Summary_Report.pdf`;
      expect(fs.existsSync(outputPdfFile)).toEqual(true);
    });

    it('shows errors if gogen returns errors', async () => {
      jest.setTimeout(30000);

      await app.client.click('#begin');

      pageTitle = await app.client.getText('.form-card__title');
      expect(pageTitle).toEqual('CA County Selection');

      const countySelect = app.client.$('#county-select');
      await countySelect.selectByVisibleText('Sacramento');
      await app.client.click('#continue');

      pageTitle = await app.client.getText('.form-card__title');
      expect(pageTitle).toEqual('Import Prop 64 bulk conviction data files');

      await app.client.chooseFile(
        '#doj-file-input',
        './test/fixtures/bad_csv_file.dat'
      );
      await app.client.click('#continue');

      pageTitle = await app.client.getText('.form-card__title');
      expect(pageTitle).toContain('Baseline eligibility');

      await app.client.click('#continue');

      const processingCardContent = await app.client.getText(
        '.form-card__content h3'
      );
      expect(processingCardContent).toContain(
        'Reading and preparing files ...'
      );
      await sleep(2);

      pageTitle = await app.client.getText('.form-card__content');
      expect(pageTitle).toContain(
        'We were not able to read the following files. Please download the original DOJ files and try again.'
      );
      expect(pageTitle).not.toContain('We encountered the following errors:');
    });
  });
});

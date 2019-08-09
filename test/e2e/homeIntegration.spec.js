import fs from 'fs';
import sleep from '../../app/utils/testHelpers';
import { getDateTime } from '../../app/utils/fileUtils';

const { Application } = require('spectron');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

let outputDirectory;

function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    fs.readdirSync(dirPath).forEach(function(entry) {
      const entryPath = path.join(dirPath, entry);
      fs.unlinkSync(entryPath);
    });
    fs.rmdirSync(dirPath);
  }
}

function getOutputDirectoryPath(dateTime) {
  return `${process.env.HOME}/Desktop/Clear_My_Record_output/CMR_output_${dateTime}`;
}

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
    removeDirectory(outputDirectory);
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

  describe('when the user chooses to dismiss all code sections', () => {
    it('skips additional relief page', async () => {
      const text = await app.client.getText('.form-card__content');
      expect(text[0]).toContain('Using Clear My Record will expedite');

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
      outputDirectory = getOutputDirectoryPath(getDateTime());

      pageTitle = await app.client.getText('.form-card__title');
      expect(pageTitle).not.toContain('Additional relief');
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
            '11359',
            '11360'
          ],
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
    });
  });
});

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

describe('The happy path', () => {
  let app;

  beforeEach(() => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '../..')]
    });
    fs.writeFileSync('tmp.txt', 'hello world &&&&&& goodbye');
    return app.start();
  });

  afterEach(() => {
    removeDirectory(outputDirectory);
    if (app && app.isRunning()) {
      return app.stop();
    }
  });

  it('loads the information page', async () => {
    const text = await app.client.getText('.form-card__content');
    expect(text[0]).toContain('Using Clear my Record will expedite');
  });

  it('can select county and continue to next screen', async () => {
    await app.client.click('#begin');
    const text = await app.client.getText('.form-card__title');
    expect(text).toEqual('CA County Selection');
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Import Prop 64 bulk conviction data file');
  });

  it('does NOT continue to next screen if county is not selected', async () => {
    await app.client.click('#begin');

    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
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

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('CA County Selection');
  });

  it('can remove selected doj file', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('.icon-close');

    const buttonText = await app.client.getText('.file-upload__label');
    expect(buttonText).toEqual('Select file');
  });

  it('can select doj file and continue to eligibility options screen', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toContain('Baseline eligibility');
  });

  // // TODO Must fix ability to click a reduce option for this test to work
  // it('can select eligibility options and display additional relief page', async () => {
  //   await app.client.click('#begin');
  //
  //   const countySelect = app.client.$('#county-select');
  //   await countySelect.selectByVisibleText('Sacramento');
  //   await app.client.click('#continue');
  //
  //   await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
  //   await app.client.click('#continue');
  //
  //   // Clicking the checkbox does not currently work: Error: unknown error: Element <input type="radio" class="RadioButton__radioButton__11Izr" name="11360" id="reduce_11360"> is not clickable at point (850, 695). Other element would receive the click: <html>...</html>
  //   // await app.client.click('#reduce_11358');
  //   await app.client.click('#continue');
  //
  //   const cardContent = await app.client.getText('.form-card__title');
  //   expect(cardContent).toContain('Additional relief');
  // });

  it('can skip additional relief page if all eligibility options are dismiss', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    await app.client.click('#continue');
    outputDirectory = getOutputDirectoryPath(getDateTime());

    const processingCardContent = await app.client.getText(
      '.form-card__content h3'
    );
    expect(processingCardContent).toContain(
      'Reading and preparing your files ...'
    );
  });

  // TODO Must fix ability to click a reduce option for this test to work
  // it('can select additional relief options and display results page', async () => {
  //   // jest.setTimeout(30000);
  //   await app.client.click('#begin');
  //
  //   const countySelect = app.client.$('#county-select');
  //   await countySelect.selectByVisibleText('Sacramento');
  //   await app.client.click('#continue');
  //
  //   await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
  //   await app.client.click('#continue');
  //
  //   // Clicking the checkbox does not currently work: Error: unknown error: Element <input type="radio" class="RadioButton__radioButton__11Izr" name="11360" id="reduce_11360"> is not clickable at point (850, 695). Other element would receive the click: <html>...</html>
  //   // await app.client.click('#reduce_11360');
  //   await app.client.click('#continue');
  //
  //   await app.client.click('#true_subjectUnder21AtConviction');
  //   const ageSelect = app.client.$('#subjectAgeThreshold-select');
  //   await ageSelect.selectByVisibleText('45');
  //
  //   const yearSelect = app.client.$('#yearsSinceConvictionThreshold-select');
  //   await yearSelect.selectByVisibleText('3');
  //
  //   await app.client.click('#true_subjectHasOnlyProp64Charges');
  //   await app.client.click('#continue');
  //
  //   const processingCardContent = await app.client.getText(
  //     '.form-card__content h3'
  //   );
  //   expect(processingCardContent).toContain(
  //     'Reading and preparing your files ...'
  //   );
  //
  //   await sleep(11);
  //   const resultsFormCardContent = await app.client.getText(
  //     '.form-card__title'
  //   );
  //   expect(resultsFormCardContent).toContain('Your files are ready!');
  // });

  it('can generate correct eligibility config file if all eligibility options are dismiss', async () => {
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

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
        subjectUnder21AtConviction: true,
        dismissOlderThanAgeThreshold: true,
        subjectAgeThreshold: 40,
        dismissYearsSinceConvictionThreshold: true,
        yearsSinceConvictionThreshold: 5,
        dismissYearsCrimeFreeThreshold: true,
        yearsCrimeFreeThreshold: 5,
        subjectHasOnlyProp64Charges: true,
        subjectIsDeceased: true
      }
    });
  });

  // TODO Must fix ability to click a reduce option for this test to work
  // it('can generate correct eligibility config file if some code sections are reduced and additional relief is chosen', async () => {
  //   await app.client.click('#begin');
  //
  //   const countySelect = app.client.$('#county-select');
  //   await countySelect.selectByVisibleText('Sacramento');
  //   await app.client.click('#continue');
  //
  //   await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
  //   await app.client.click('#continue');
  //
  //   await app.client.click('#reduce_11360');
  //   await app.client.click('#continue');
  //
  //   await app.client.click('#true_subjectUnder21AtConviction');
  //   const ageSelect = app.client.$('#subjectAgeThreshold-select');
  //   await ageSelect.selectByVisibleText('45');
  //
  //   const yearSelect = app.client.$('#yearsSinceConvictionThreshold-select');
  //   await yearSelect.selectByVisibleText('3');
  //
  //   await app.client.click('#true_subjectHasOnlyProp64Charges');
  //   await app.client.click('#continue');
  //
  //   outputDirectory = getOutputDirectoryPath(getDateTime());
  //   const eligibilityConfigFilePath = `${outputDirectory}/eligibilityConfig_${getDateTime()}.json`;
  //
  //   const eligibilityConfigFileContents = fs.readFileSync(
  //     eligibilityConfigFilePath,
  //     'utf8'
  //   );
  //   const eligibilityConfig = JSON.parse(eligibilityConfigFileContents);
  //
  //   expect(eligibilityConfig).toEqual({
  //     baselineEligibility: {
  //       dismiss: [
  //         '11357(a)',
  //         '11357(b)',
  //         '11357(c)',
  //         '11357(d)',
  //         '11357(no-sub-section)',
  //         '11358',
  //         '11359'
  //       ],
  //       reduce: ['11360']
  //     },
  //     additionalRelief: {
  //       subjectUnder21AtConviction: false,
  //       dismissOlderThanAgeThreshold: true,
  //       subjectAgeThreshold: 45,
  //       dismissYearsSinceConvictionThreshold: true,
  //       yearsSinceConvictionThreshold: 3,
  //       dismissYearsCrimeFreeThreshold: true,
  //       yearsCrimeFreeThreshold: 5,
  //       subjectHasOnlyProp64Charges: false,
  //       subjectIsDeceased: true
  //     }
  //   });
  // });

  it('can complete process and display results page', async () => {
    jest.setTimeout(30000);
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    await app.client.click('#continue');
    outputDirectory = getOutputDirectoryPath(getDateTime());

    await sleep(11);
    const resultsFormCardContent = await app.client.getText(
      '.form-card__title'
    );
    expect(resultsFormCardContent).toContain('Your files are ready!');
  });
});

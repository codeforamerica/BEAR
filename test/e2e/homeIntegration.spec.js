import sleep from '../../app/utils/testHelpers';

const { Application } = require('spectron');
const electronPath = require('electron'); // Require Electron from the binaries included in node_modules.
const path = require('path');

describe('The happy path', () => {
  let app;

  beforeEach(() => {
    app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '../..')]
    });
    return app.start();
  });

  afterEach(() => {
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

    const fileName = await app.client.getText('#no-error-message');
    expect(fileName).toEqual('No file selected');
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

  it('can complete process and display results page', async () => {
    jest.setTimeout(30000);
    await app.client.click('#begin');

    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    await app.client.click('#continue');

    await sleep(11);
    const resultsFormCardContent = await app.client.getText(
      '.form-card__title'
    );
    expect(resultsFormCardContent).toContain('Your files are ready!');
  });
});

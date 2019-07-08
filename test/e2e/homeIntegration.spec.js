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

  it('loads the first screen', async () => {
    const text = await app.client.getText('.form-card__title');
    expect(text).toEqual('Proposition 64 CA DOJ data upload');
  });

  it('can select county and continue to next screen', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Upload .dat file');
  });

  it('does NOT continue to next screen if county is not selected', async () => {
    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Proposition 64 CA DOJ data upload');
  });

  it('can select doj file and display the name', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    const fileName = await app.client.getText('.doj-file');
    expect(fileName).toEqual('file.dat');
  });

  it('can go back to the county select page', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.click('#goback');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toEqual('Proposition 64 CA DOJ data upload');
  });

  it('can remove selected doj file', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('.icon-close');

    const buttonText = await app.client.getText('.file-upload__label');
    expect(buttonText).toEqual('Upload File');
  });

  it('can select doj file and continue to eligibility options screen', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    const pageTitle = await app.client.getText('.form-card__title');
    expect(pageTitle).toContain('Baseline eligibility');
  });

  it('can select eligibility options and display additional relief page', async () => {
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    // Clicking the checkbox does not currently work: Error: unknown error: Element <input type="radio" class="RadioButton__radioButton__11Izr" name="11360" id="reduce_11360"> is not clickable at point (850, 695). Other element would receive the click: <html>...</html>
    // await app.client.click('#reduce_11360');
    await app.client.click('#continue');

    const cardContent = await app.client.getText('.form-card__title');
    expect(cardContent).toContain('Additional relief');
  });

  it('can select additional relief options and display results page', async () => {
    jest.setTimeout(30000);
    const countySelect = app.client.$('#county-select');
    await countySelect.selectByVisibleText('Sacramento');
    await app.client.click('#continue');

    await app.client.chooseFile('#doj-file-input', './test/fixtures/file.dat');
    await app.client.click('#continue');

    // Clicking the checkbox does not currently work: Error: unknown error: Element <input type="radio" class="RadioButton__radioButton__11Izr" name="11360" id="reduce_11360"> is not clickable at point (850, 695). Other element would receive the click: <html>...</html>
    // await app.client.click('#reduce_11360');
    await app.client.click('#continue');

    await app.client.click('#true_subjectUnder21AtConviction');
    const ageSelect = app.client.$('#subjectAgeThreshold-select');
    await ageSelect.selectByVisibleText('45');

    const yearSelect = app.client.$('#yearsSinceConvictionThreshold-select');
    await yearSelect.selectByVisibleText('3');
    await app.client.click('#continue');

    const cardContent = await app.client.getText('.form-card__title');
    expect(cardContent).toContain('Your files are ready!');
  });
});

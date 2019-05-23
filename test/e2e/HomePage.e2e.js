import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);
const countySelect = Selector('#county-select');
const countyOption = countySelect.find('option');
const continueButton = Selector('.button').nth(0);
const cardHeader = Selector('.form-card__title').nth(0);
const getCardHeaderText = () => cardHeader().innerText;
const assertNoConsoleErrors = async t => {
  const { error } = await t.getBrowserConsoleMessages();
  await t.expect(error).eql([]);
};

fixture`Home Page`.page('../../app/app.html').afterEach(assertNoConsoleErrors);

test('e2e', async t => {
  await t.expect(getPageTitle()).eql('Hello Electron React!');
});

test('should open window', async t => {
  await t.expect(getPageTitle()).eql('Hello Electron React!');
});

test(
  "should haven't any logs in console of main window",
  assertNoConsoleErrors
);

test('should display the first page', async t => {
  await t.expect(getCardHeaderText()).eql('Proposition 64 CA DOJ data upload');
});

test('selecting county and clicking continue should show next screen', async t => {
  await t
    .click(countySelect)
    .click(countyOption.withText('Sacramento'))
    .click(continueButton)
    .expect(getCardHeaderText())
    .eql('Sacramento Proposition 64 CA DOJ data upload');
});

test('selecting county and clicking continue should hide previous screen', async t => {
  await t
    .click(countySelect)
    .click(countyOption.withText('Sacramento'))
    .click(continueButton)
    .expect(Selector('.form-card').count)
    .eql(1);
});

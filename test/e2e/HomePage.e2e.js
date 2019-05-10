import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);
const continueButton = Selector('.button').nth(0);
const getContinueButtonText = () => continueButton().innerText;
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

test('should display a continue button', async t => {
  await t
    .click(continueButton)
    .expect(getContinueButtonText())
    .eql('Continue ');
});

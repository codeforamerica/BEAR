import { ClientFunction, Selector } from 'testcafe';

const getPageTitle = ClientFunction(() => document.title);
const buttonsSelector = Selector('[data-tclass="btn"]');
const runButton = buttonsSelector.nth(0);
const getRunButtonText = () => runButton().innerText;
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

test('should display a run button', async t => {
  const { log } = await t.getBrowserConsoleMessages();
  console.log(log);
  await t
    .click(runButton)
    .expect(getRunButtonText())
    .eql('RUN');
});

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

  it('loads the first screen', () => {
    return app.client.getText('.form-card__title').then(text => {
      return expect(text).toEqual('Proposition 64 CA DOJ data upload');
    });
  });

  it('can select county and continue to next screen', () => {
    const countySelect = app.client.$('#county-select');
    return countySelect.selectByVisibleText('Sacramento').then(() => {
      return app.client.click('.button').then(() => {
        return app.client.getText('.form-card__title').then(pageTitle => {
          return expect(pageTitle).toEqual('Upload .dat file');
        });
      });
    });
  });

  it('does NOT continue to next screen if county is not selected', () => {
    return app.client.click('.button').then(() => {
      return app.client.getText('.form-card__title').then(pageTitle => {
        return expect(pageTitle).toEqual('Proposition 64 CA DOJ data upload');
      });
    });
  });

  it('can select doj file and display the name', () => {
    const countySelect = app.client.$('#county-select');
    return countySelect.selectByVisibleText('Sacramento').then(() => {
      return app.client.click('.button').then(() => {
        return app.client
          .chooseFile('#doj-file-input', './test/fixtures/file.dat')
          .then(() => {
            return app.client.getText('.doj-file').then(fileName => {
              return expect(fileName).toEqual('file.dat');
            });
          });
      });
    });
  });

  it('can remove selected doj file', () => {
    const countySelect = app.client.$('#county-select');
    return countySelect.selectByVisibleText('Sacramento').then(() => {
      return app.client.click('.button').then(() => {
        return app.client
          .chooseFile('#doj-file-input', './test/fixtures/file.dat')
          .then(() => {
            return app.client.click('.icon-close').then(() => {
              return app.client
                .getText('.file-upload__label')
                .then(buttonText => {
                  return expect(buttonText).toEqual('Upload File');
                });
            });
          });
      });
    });
  });

  it('can select doj file and continue to eligibility options screen', () => {
    const countySelect = app.client.$('#county-select');
    return countySelect.selectByVisibleText('Sacramento').then(() => {
      return app.client.click('.button').then(() => {
        return app.client
          .chooseFile('#doj-file-input', './test/fixtures/file.dat')
          .then(() => {
            return app.client.click('.button').then(() => {
              return app.client.getText('.form-card__title').then(pageTitle => {
                return expect(pageTitle).toContain(
                  'Analysis for Implementation'
                );
              });
            });
          });
      });
    });
  });

  it('can select eligibility options and process file', () => {
    const countySelect = app.client.$('#county-select');
    return countySelect.selectByVisibleText('Sacramento').then(() => {
      return app.client.click('#continue').then(() => {
        return app.client
          .chooseFile('#doj-file-input', './test/fixtures/file.dat')
          .then(() => {
            return app.client.click('#continue').then(() => {
              return app.client.click('#reduce_11360').then(() => {
                return app.client.click('.button').then(() => {
                  return app.client
                    .getText('.form-card__title')
                    .then(cardContent => {
                      return expect(cardContent).toEqual(
                        'Preparing your files'
                      );
                    });
                });
              });
            });
          });
      });
    });
  });
});

/* eslint no-undef: 0 */

const fs = jest.genMockFromModule('fs');

let pathExists = true;
let fileContent = '';

function __setExistsSync(exists) {
  pathExists = exists;
}

function __setFileContent(content) {
  fileContent = content;
}

function mockExistsSync() {
  return pathExists;
}

const mockReadFileSync = jest.fn().mockImplementation(() => fileContent);

fs.__setExistsSync = __setExistsSync;
fs.__setFileContent = __setFileContent;
fs.existsSync = mockExistsSync;
fs.readFileSync = mockReadFileSync;

module.exports = fs;

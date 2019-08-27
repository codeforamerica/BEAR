import fs from 'fs';
import { createJsonFile, getDateTime } from '../../app/utils/fileUtils';

jest.mock('fs');

afterEach(() => {
  jest.clearAllMocks();
});

describe('createJsonFile', () => {
  it('writes json data to a new file', () => {
    createJsonFile({ hello: 'goodbye' }, './file');
    expect(fs.writeFileSync.mock.calls.length).toEqual(1);
    expect(fs.writeFileSync.mock.calls[0]).toEqual([
      './file',
      '{"hello":"goodbye"}'
    ]);
  });
});

describe('getDateTime', () => {
  it('converts date to formatted string without seconds', () => {
    const date = new Date(2019, 1, 2, 1, 20, 30);
    const convertedDate = getDateTime(date);

    expect(convertedDate).toMatch('01_02_2019_01.20.AM');
  });
});

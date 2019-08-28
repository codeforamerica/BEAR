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
  it('converts date to formatted string, including seconds', () => {
    const date = new Date('01 Feb 1970 01:20:30'); // in local timezone
    const convertedDate = getDateTime(date);

    expect(convertedDate).toMatch('02_01_1970_01.20.30.AM');
  });
});

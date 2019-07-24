import fs from 'fs';
import { createJsonFile } from '../../app/utils/fileUtils';

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

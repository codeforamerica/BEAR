import fs from 'fs';
import { createJsonFile } from '../../app/utils/fileUtils';

describe('createJsonFile', () => {
  it('writes json data to a new file', () => {
    createJsonFile({ hello: 'goodbye' }, './file');
    const file = fs.readFileSync('./file', 'utf8');
    expect(file).toEqual('{"hello":"goodbye"}');
    fs.unlinkSync('./file');
  });
});

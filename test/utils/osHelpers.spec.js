import fs from 'fs';
import openFolder from '../../app/utils/osHelpers';

describe('openFolder', () => {
  it('opens a file dialogue with all files produced by gogen', () => {
    const path = '/tmp/testFolder';
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    expect(openFolder(path)).toEqual(true);
  });
});

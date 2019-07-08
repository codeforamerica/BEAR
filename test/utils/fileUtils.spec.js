import fs from 'fs';
import createJsonFile from '../../app/utils/fileUtils';

describe('createJsonFile', () => {
  it('writes json data to a new file', () => {
    createJsonFile({ hello: 'goodbye' }, './file');
    const file = fs.readFileSync('./file', 'utf8');
    expect(file).toEqual('{"hello":"goodbye"}');
    fs.unlinkSync('./file');
  });
});
// need to test functionality. How do we read a pdf's contents in a test?
// describe('fillPdf', () => {
//   it('writes data to a fillable PDF', () => {
//     const options = {outputDateTime: 'this is the time.'};
//     fillPDF('./resources/summaryResultsTemplate.pdf', './file', options);
//     const file = fs.readFileSync('./file', 'utf8');
//     expect(file).toEqual('{"hello":"goodbye"}');
//     fs.unlinkSync('./file');
//   });
// });

const { exec } = require('child_process');

export default function openFolder(path: string) {
  if (process.platform === 'darwin') {
    console.log('in there');
    openOnMac(path);
  } else {
    openOnWindows(path);
  }
}

export function openOnMac(path: string) {
  exec(`open ${path}`, (err, stdout, stderr) => {
    console.log('im in there');
    if (err) {
      return 'false';
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  return 'true';
}

export function openOnWindows(path: string) {
  exec(`start c:${path} `, (err, stdout, stderr) => {
    if (err) {
      return 'false';
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
  return 'true';
}

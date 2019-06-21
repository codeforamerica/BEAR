const { exec } = require('child_process');

export default function openFolder(path: string): boolean {
  if (process.platform === 'darwin') {
    return openOnMac(path);
  }
  return openOnWindows(path);
}

export function openOnMac(path: string): boolean {
  exec(`open ${path}`, err => {
    if (err) {
      return false;
    }
  });
  return true;
}

export function openOnWindows(path: string): boolean {
  exec(`start c:${path} `, err => {
    if (err) {
      return false;
    }
  });
  return true;
}

import { shell } from 'electron';

export default function showFileInFolder(filePath: string): boolean {
  shell.showItemInFolder(filePath).catch(console.log);
}

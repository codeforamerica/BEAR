declare type ElectronProcess = Process & { resourcesPath: string };
declare type File = File & { path: string };
declare var process: ElectronProcess;

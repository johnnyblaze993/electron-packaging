// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  openTestWindow: () => ipcRenderer.send('open-test-window'),
  testFunction: () => console.log("Preload is working!"),
});

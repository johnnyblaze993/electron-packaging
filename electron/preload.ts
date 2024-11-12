// electron/preload.ts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Method to open the test window
  openTestWindow: () => ipcRenderer.send('open-test-window')
});

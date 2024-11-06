// electron/preload.ts
import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  // Expose any APIs you need here
});

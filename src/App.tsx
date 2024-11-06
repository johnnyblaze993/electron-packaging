(window as any).CESIUM_BASE_URL = './cesium';

import React, { useRef, useEffect } from 'react';
import { Viewer } from 'resium';
import { Ion, Cartesian3 } from 'cesium';
import './App.css';

// Set your Cesium Ion Access Token
Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2M2I0NDlhNi0xM2ZmLTQzODEtOWQ3OC03OTg3NDU3MTBlODUiLCJpZCI6MjUwNTMwLCJpYXQiOjE3Mjk3NzgzNzR9.kb003ews9fyouXCJthtNxLDIYMukHobYM60UOiv5FpI';

function App() {
  const viewerRef = useRef<any>(null);

  useEffect(() => {
    const viewer = viewerRef.current?.cesiumElement;

    if (viewer) {
      const handleViewerReady = () => {
        // Perform the flyTo once the viewer is fully ready
        viewer.camera.flyTo({
          destination: Cartesian3.fromDegrees(-122.4175, 37.655, 4000), // San Francisco
        });
      };

      // Wait for the viewer to be fully initialized
      if (viewer.scene) {
        handleViewerReady();
      } else {
        viewer.sceneInitialized.addEventListener(handleViewerReady);
      }
    }
  }, []);

  return (

      <div >
        <Viewer ref={viewerRef} full />
      </div>
  );
}

export default App;
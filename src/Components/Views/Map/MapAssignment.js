import React, { useEffect, useState } from 'react';
import Header from '../../Structure/Header';
import MapSagit from '../../Structure/MapSagit';

const MapAssignment = () => {

  const [mapRef, setMapRef] = useState();

  useEffect(() => {
    document.title = "SAGIT | Asignaciones";
  }, []);

  
  return (
    <section>
      <div>
        <Header />
      </div>
      <MapSagit setRef={setMapRef}>
        
      </MapSagit>
    </section>
  );
}

export default MapAssignment;

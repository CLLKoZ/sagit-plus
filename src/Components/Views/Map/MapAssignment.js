import React, { useEffect, useState } from 'react';
import Header from '../../Structure/Header/Header';
import MapSagit from '../../Structure/MapSagit';

const MapAssignment = () => {

  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    document.title = "SAGIT | Asignaciones";
  }, []);

  
  return (
    <section>
      <div>
        <Header />
      </div>
      <MapSagit setCoordinates={setCoordinates}>
        
      </MapSagit>
    </section>
  );
}

export default MapAssignment;

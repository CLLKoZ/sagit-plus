import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapSagit = ({children, mapCoordinates}) => {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if(map) {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      mapCoordinates([NorthEast, NorthWest, SouthWest, SouthEast]);
    }
  }, [map, mapCoordinates]);

  return (
    <>
      <MapContainer 
        ref={setMap} 
        center={[13.72023, -89.202182]} 
        zoom={15}
      >
        <TileLayer 
          maxZoom={19.5}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribuidores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {children}
      </MapContainer>
    </>
  );
}

export default MapSagit;
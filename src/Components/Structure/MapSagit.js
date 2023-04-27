import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapSagit = ({children, setRef}) => {
  return (
    <>
      <MapContainer 
        ref={setRef} 
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
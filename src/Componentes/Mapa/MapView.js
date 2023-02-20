import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer } from 'react-leaflet';

const MapView = () =>{
  return(
    <MapContainer center={[13.72023, -89.202182]} zoom={16}>
      <TileLayer
        attribution='&copy; OpenStreetMap <a href="https://www.openstreetmap.org/copyright>OpenStreetMap</a>"'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
};

export default MapView;
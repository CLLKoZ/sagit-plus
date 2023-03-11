import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Header from '../Estructura/Header';
import FiltroMapa from '../FiltroMapa/FiltroM';
import { getObjectEvaluation } from '../../Funciones/ObjectEvaluation';
import { Icon } from 'leaflet';
import {GetInit, GetPolygon} from '../../Funciones/map'

const MapView = () =>{

  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5737/5737612.png",
    iconSize: [30, 30]
  })

  useEffect(() =>{
    getObjectEvaluation(setMarker)
  }, [])

  return(
    <section>
      <div>
        <Header></Header>
      </div>
      <div>
        <FiltroMapa></FiltroMapa>
      </div>
      
      <div className='contenido'>
        { markers != null ? (<MapContainer ref={setMapRef} center={[-89.18718, 13.68935].reverse()} zoom={15} >
          <TileLayer 
            attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribuidores'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {markers.map(marker=>(
            <div key={marker._id}>
              {
                <Marker position={marker.address.location.coordinates} icon={customIcon}>
                  <Popup><h5>{marker.name}</h5></Popup>
                </Marker>
              }
            </div>
          ))
          }
          <GetInit />
          <GetPolygon></GetPolygon>
        </MapContainer>) : ('Cargando...')}
      </div>
    </section>
  );
};

export default MapView;
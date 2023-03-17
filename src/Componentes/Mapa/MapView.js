import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Header from '../Estructura/Header';
import PanelFiltroMapa from '../FiltroMapa/FiltroM';
import { getObjectEvaluationByViewPort } from '../../Funciones/ObjectEvaluation';
import { Icon } from 'leaflet';
import { GetPolygon } from '../../Funciones/map'

const MapView = () =>{

  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [filtro, setFiltro] = useState(null);

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5737/5737612.png",
    iconSize: [30, 30]
  })

  useEffect(() =>{
    if(mapRef){
      const NorthEast = mapRef.getBounds().getNorthEast();
      const NorthWest = mapRef.getBounds().getNorthWest();
      const SouthWest = mapRef.getBounds().getSouthWest();
      const SouthEast = mapRef.getBounds().getSouthEast();
      getObjectEvaluationByViewPort(setMarker, NorthEast, NorthWest, SouthWest, SouthEast)
    }
    if(filtro){console.log(filtro)}
  }, [mapRef, filtro])

  return(
    <section>
      <div>
        <Header></Header>
        <PanelFiltroMapa state={setFiltro}></PanelFiltroMapa>
      </div>
      <div className='contenido'>
      <MapContainer ref={setMapRef} center={[13.72023, -89.202182]} zoom={15} >
        <TileLayer 
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribuidores'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
        <GetPolygon estado={setMarker}></GetPolygon>
        { markers != null ? (
          markers.map(marker=>(
            <div key={marker._id} >
              {
                <Marker className='marknimation' position={marker.address.location.coordinates} icon={customIcon}>
                  <Popup ><h5>{marker.name}</h5></Popup>
                </Marker>
              }
            </div>
          ))
        ) : ('Cargando...')}
      </MapContainer>
      </div>
    </section>
  );
};

export default MapView;
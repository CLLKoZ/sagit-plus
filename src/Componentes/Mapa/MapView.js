import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import Header from '../Estructura/Header';
import { getObjectEvaluation, getObjectEvaluationByViewPort } from '../../Funciones/ObjectEvaluation';
import { Icon } from 'leaflet';


const MapView = () =>{

  const [markers, setMarker] = useState(null);
  const [polygon, setPolygon] = useState(null);
  let NorthEast
  let NorthWest
  let SouthWest
  let SouthEast

  const customIcon = new Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/5737/5737612.png",
    iconSize: [30, 30]
  })

  useEffect(() =>{
    getObjectEvaluation(setMarker)
  }, [])

  function GetPolygon(){
    const map = useMapEvents({
      move() {
        NorthEast = map.getBounds().getNorthEast();
        NorthWest = map.getBounds().getNorthWest();
        SouthWest = map.getBounds().getSouthWest();
        SouthEast = map.getBounds().getSouthEast();
      },
      click(){getObjectEvaluationByViewPort(NorthEast, NorthWest, SouthWest, SouthEast)}
    })
  }

  console.log(markers)

  return(
    <body>
      <Header isLogged={true}></Header>
      <section className='contenido'>
        { markers != null ? (<MapContainer center={[-89.18718, 13.68935].reverse()} zoom={15} >
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
        </MapContainer>) : ('Cargando...')}
      </section>
    </body>
  );
};

export default MapView;
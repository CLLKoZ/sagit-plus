import { useCallback, useMemo, useState, useEffect } from "react";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Popup, Marker } from 'react-leaflet';
import { Icon } from 'leaflet';
import { getObjectEvaluation, getObjectEvaluationByViewPort } from '../../Funciones/ObjectEvaluation';

const center = [13.68935, -89.18718]
const zoom = 15
let NorthEast
let NorthWest
let SouthWest
let SouthEast

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/5737/5737612.png",
  iconSize: [30, 30]
})

function GetByViewport({ map }, {state}){

  NorthEast = map.getBounds().getNorthEast();
  NorthWest = map.getBounds().getNorthWest();
  SouthWest = map.getBounds().getSouthWest();
  SouthEast = map.getBounds().getSouthEast();
  getObjectEvaluationByViewPort(NorthEast, NorthWest, SouthWest, SouthEast)

  const onMoveEnd = useCallback(()=>{
    NorthEast = map.getBounds().getNorthEast();
    NorthWest = map.getBounds().getNorthWest();
    SouthWest = map.getBounds().getSouthWest();
    SouthEast = map.getBounds().getSouthEast();
    getObjectEvaluationByViewPort(NorthEast, NorthWest, SouthWest, SouthEast)
  })

  useEffect(() => {
    map.on('moveend', onMoveEnd)
    return () =>{
      map.off('moveend', onMoveEnd)
    }
  }, [map, onMoveEnd, state]);
}

function ExternalStateMap(){
  const [map, setMap] = useState(null)
  const [markers, setMarkers] = useState()

  const displayMap = useMemo(
    () => (
      markers != null ? (<MapContainer center={[-89.18718, 13.68935].reverse()} zoom={15} >
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
        </MapContainer>) : ('Cargando...')
    ),
    [],
    )
    return (
      <div>
        {map ? <GetByViewport map={map} state={setMarkers} /> : null}
        {getObjectEvaluation(setMarkers)}
        {displayMap}
      </div>
    )
}

export default ExternalStateMap
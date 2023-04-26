import React, { useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Spinner } from 'reactstrap';
import Header from '../../Structure/Header/Header';
import PanelFiltroMapa from '../../Structure/FilterMap/PanelFilter';
import { getObjectEvaluationByViewPort, markerCounter } from '../../../Functions/ObjectEvaluation';
import { getIconMarker, GetPolygon } from '../../../Functions/map';
import ModalInspection from '../../Structure/MadeInspection/ModalInspection';
import { ToastContainer, toast } from 'react-toastify';

import 'leaflet/dist/leaflet.css';
import '../../../Styles/mapa.css';
import 'react-toastify/dist/ReactToastify.css';

const MapView = () =>{
  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [formInspection, setFormInspection] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [filtroMap, setFiltroMap] = useState(null);
  const [counter, setCounter] = useState(null);
  /*Elementos necesarios para invocar un modal*/
  const [modal, setModal] = useState(false);
  
  useEffect (() => {
    let socket = new WebSocket('ws://168.232.50.15/websocket');
    socket.onopen = () => {
      socket.send('Un mensaje');
    };
    socket.onmessage = (e) => {
      let parsedMessage = JSON.parse(e.data)

      if (!parsedMessage['data'])
        parsedMessage = JSON.parse(parsedMessage)

      if (parsedMessage["ObjectEvaluation"] && mapRef) {
        const NorthEast = mapRef.getBounds().getNorthEast();
        const NorthWest = mapRef.getBounds().getNorthWest();
        const SouthWest = mapRef.getBounds().getSouthWest();
        const SouthEast = mapRef.getBounds().getSouthEast();
        getObjectEvaluationByViewPort(setMarker, NorthEast, NorthWest, SouthWest, SouthEast)
      }
    }
  }, [mapRef])

  useEffect(() =>{
    if(mapRef){
      const NorthEast = mapRef.getBounds().getNorthEast();
      const NorthWest = mapRef.getBounds().getNorthWest();
      const SouthWest = mapRef.getBounds().getSouthWest();
      const SouthEast = mapRef.getBounds().getSouthEast();
      if(filtroMap) {
        getObjectEvaluationByViewPort(setMarker, NorthEast, NorthWest, SouthWest, SouthEast, filtroMap)
      } else {
        getObjectEvaluationByViewPort(setMarker, NorthEast, NorthWest, SouthWest, SouthEast)
      }
    }
  }, [mapRef, formInspection, filtroMap])

  useEffect(() => {
    document.title = "SAGIT | Mapa"
    if (markers) {
      setCounter(markerCounter(markers))
    }
  }, [markers])

  const openModal=(ins)=>{
    if (formInspection){
      setModal(!modal);
      if(!modal){
        setInspection(ins);
      } else {
        setInspection(null);
      }
    } else {
      toast.warn("Seleccione un formulario", {style: {background: '#0f1f52'}})
    }
  };

  return(
    <section>
      <div>
        <Header evaluationHeader={markers} form={formInspection} counter={counter}/>
        <PanelFiltroMapa state={setFormInspection} setFiltro={setFiltroMap}/>
        {
          formInspection ? (
            <ModalInspection 
              isOpenM={modal} 
              toggleM={openModal} 
              inspectionModal={inspection} 
              idForm={formInspection.id}
            />
          ) : (
            <ToastContainer position="bottom-center"
              autoClose={5000}
              limit={3}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
            />
          )
        }
      </div>
      <div className='contenido'>
      <MapContainer ref={setMapRef} center={[13.72023, -89.202182]} zoom={15} >
        <TileLayer 
          maxZoom={19.5}
          attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> Contribuidores'
          url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"/>
        <GetPolygon estado={setMarker} filtroMove={filtroMap}></GetPolygon>
        { markers != null ? (
          markers.map(marker=>(
            <div key={marker._id} >
              {
                <Marker 
                  position={marker.address.location.coordinates} 
                  icon={getIconMarker(marker.type_object[0].icon)}>
                  <Popup><span className='pop-up' onClick={() => {openModal(marker)}}>{marker.name}</span></Popup>
                </Marker>
              }
            </div>
          ))
        ) : <div className='spinner'>
              <Spinner color='primary'>
                Loading...
              </Spinner>
            </div>}
      </MapContainer>
      </div>
    </section>
  );
};

export default MapView;
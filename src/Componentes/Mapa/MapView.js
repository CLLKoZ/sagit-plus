import React, { useEffect, useState} from 'react';
import 'leaflet/dist/leaflet.css';
import '../../Estilos/mapa.css'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Header from '../Estructura/Header';
import PanelFiltroMapa from '../FiltroMapa/FiltroM';
import { Spinner } from 'reactstrap';
import { getObjectEvaluationByViewPort } from '../../Funciones/ObjectEvaluation';
import { getIconMarker, GetPolygon } from '../../Funciones/map'
import ModalInspection from '../Estructura/ModalInspection';

const MapView = () =>{

  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [filtro, setFiltro] = useState(null);
  const [inspection, setInspection] = useState(null);

  /*Elementos necesarios para invocar un modal*/
  const [modal, setModal] = useState(false);
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

  /* Esta función ayuda a cambiar el estado del modal para abrirlo */
  const openModal=(ins)=>{
    setModal(!modal);
    if(!modal){
      setInspection(ins);
    } else {
      setInspection(null);
    }
  };

  return(
    <section>
      <div>
        <Header></Header>
        <PanelFiltroMapa state={setFiltro}></PanelFiltroMapa>
        {
          filtro ? (
            <ModalInspection 
              isOpenM={modal} 
              toggleM={openModal} 
              inspectionModal={inspection} 
              idForm={filtro}
            />
          ) : (
            <Modal contentClassName='modal-map-size' centered isOpen={modal} toggle={openModal}>
              <ModalHeader cssModule={{'modal-title': 'w-100 text-center'}}>
                <strong>No ha seleccionado ningun filtro</strong>
              </ModalHeader>
            </Modal>
          )
        }
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
                <Marker 
                  position={marker.address.location.coordinates} 
                  icon={getIconMarker(marker.type_object[0].icon)}>
                  <Popup><h5 onClick={() => {openModal(marker)}}>{marker.name}</h5></Popup>
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

/*const MapView = () =>{
  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [filtro, setFiltro] = useState(null);

  Elementos necesarios para invocar un modal
  const [modal, setModal] = useState(false);
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

  Esta función ayuda a cambiar el estado del modal para abrirlo
  const openModal=()=>{
    setModal(!modal);
  };

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
                <Marker 
                  position={marker.address.location.coordinates} 
                  icon={getIconMarker(marker.type_object[0].icon)}>
                  <Popup><h5 onClick={openModal}>{marker.name}</h5></Popup>
                </Marker>
              },
              {
                <ModalInspection modal={modal} toggle={openModal} state={setFiltro} idForm={filtro} marcador={marker.inspection}/>
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
};*/

export default MapView;
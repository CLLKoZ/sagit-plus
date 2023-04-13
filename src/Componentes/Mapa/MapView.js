import React, { useEffect, useState} from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Modal, ModalHeader, Spinner } from 'reactstrap';
import Header from '../Estructura/Header';
import PanelFiltroMapa from '../FiltroMapa/PanelFiltro';
import { getObjectEvaluationByViewPort } from '../../Funciones/ObjectEvaluation';
import { getIconMarker, GetPolygon } from '../../Funciones/map';
import ModalInspection from '../Estructura/ModalInspection';
import 'leaflet/dist/leaflet.css';
import '../../Estilos/mapa.css';

const MapView = () =>{
  const [markers, setMarker] = useState(null);
  const [mapRef, setMapRef] = useState(null);
  const [formInspection, setFormInspection] = useState(null);
  const [inspection, setInspection] = useState(null);
  const [filtroMap, setFiltroMap] = useState(null);
  const [change, setChange] = useState(false);

  /*Elementos necesarios para invocar un modal*/
  const [modal, setModal] = useState(false);
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
  }, [mapRef, formInspection, filtroMap, change])

  useEffect(() => {
    if (filtroMap) {
      markers.forEach(mark => {
        //console.log(mark)
        mark.inspection.forEach(inspection => {
          inspection.inspectionFull.forEach((full, index) => {
            //console.log(index)
            if (full !== undefined) {
              //console.log('No es indefinido')
            }
          })
        })
      })
    }
  }, [markers, filtroMap])
  
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
        <Header evaluationHeader={markers} form={formInspection} />
        <PanelFiltroMapa state={setFormInspection} setFiltro={setFiltroMap} setChangeMap={setChange}/>
        {
          formInspection ? (
            <ModalInspection 
              isOpenM={modal} 
              toggleM={openModal} 
              inspectionModal={inspection} 
              idForm={formInspection.id}
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

export default MapView;
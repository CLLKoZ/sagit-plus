import { useEffect, useState} from 'react';
import { Marker, Popup } from 'react-leaflet';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Spinner } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import Header from '../../Structure/Header/Header';
import MapSagit from '../../Structure/General/MapSagit';
import PanelFiltroMapa from '../../Structure/FilterMap/PanelFilter';
import ModalInspection from '../../Structure/MadeInspection/ModalInspection';
import { GetPolygon, getIconMarker, getObjectEvaluationByViewPort, markerCounter } from '../../../Functions';

import 'leaflet/dist/leaflet.css';
import '../../../Styles/mapa.css';
import 'react-toastify/dist/ReactToastify.css';
import { mdiFileDocument, mdiFilterMultiple, mdiMicrosoftExcel } from '@mdi/js';
import Icon from '@mdi/react';
import { downloadCSV } from '../../../Functions/donwloadReport';

const MapView = () =>{
  const [markers, setMarker] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [formInspection, setFormInspection] = useState(null);
  const [objectEvaluation, setObjectEvaluation] = useState(null);
  const [filtroMap, setFiltroMap] = useState(null);
  const [counter, setCounter] = useState(null);
  const [dropdownOpenReport, setDropdownOpenReport] = useState(false);
  /*Elementos necesarios para invocar un modal*/
  const [modal, setModal] = useState(false);

  useEffect (() => {
    let socket = new WebSocket('ws://168.232.50.15/websocket');
    socket.onopen = () => {
      socket.send('Un mensaje');
    };
    socket.onmessage = (e) => {
      let parsedMessage = JSON.parse(e.data);

      if (!parsedMessage['data'])
        parsedMessage = JSON.parse(parsedMessage);

      if (parsedMessage["ObjectEvaluation"] && coordinates && filtroMap)
        getObjectEvaluationByViewPort(setMarker, coordinates, filtroMap);
      else if (parsedMessage["ObjectEvaluation"] && coordinates)
        getObjectEvaluationByViewPort(setMarker, coordinates);
    }
  }, [coordinates, filtroMap]);

  useEffect(() =>{
    if(coordinates && filtroMap) {
      getObjectEvaluationByViewPort(setMarker, coordinates, filtroMap);
    } else if (coordinates){;
      getObjectEvaluationByViewPort(setMarker, coordinates);
    }
  }, [coordinates, formInspection, filtroMap]);

  useEffect(() => {
    document.title = "SAGIT | Mapa"
    if (markers) {
      setCounter(markerCounter(markers))
    }
  }, [markers]);

  const openModal=(evaluation)=>{
    if (formInspection){
      setModal(!modal);
      if(!modal){
        setObjectEvaluation(evaluation);
      } else {
        setObjectEvaluation(null);
      }
    } else {
      toast.warn("Seleccione un formulario", {style: {background: '#0f1f52'}})
    }
  };
  
  const toggleDropdownReport = () => setDropdownOpenReport(!dropdownOpenReport);

  return(
    <section>
      <div>
        <Header counter={counter}>
          <label htmlFor='btnActive' className="filtro">
            <Icon path={mdiFilterMultiple} size={1} />
            &nbsp;Filtros
          </label>
          <label>
            <Dropdown isOpen={dropdownOpenReport} toggle={toggleDropdownReport}>
              <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenReport ? "transparent" : "transparent" }}>
              <Icon path={mdiFileDocument} size={1} />
                &nbsp;Reportes
              </DropdownToggle>
              <DropdownMenu style={{zIndex: 1002}}>
                <DropdownItem onClick={()=>{downloadCSV(markers, formInspection)}}><Icon path={mdiMicrosoftExcel} size={1} />&nbsp;CSV</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </label>
        </Header>
        <PanelFiltroMapa state={setFormInspection} setFiltro={setFiltroMap}/>
        {
          formInspection ? (
            <ModalInspection 
              isOpenM={modal} 
              toggleM={openModal} 
              inspectionModal={objectEvaluation} 
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
      <MapSagit mapCoordinates={setCoordinates}>
        <div className='contenido'>
        <GetPolygon estado={setMarker} filtroMove={filtroMap} setCoor={setCoordinates}></GetPolygon>
        { markers != null ? (
          markers.map(marker=> (
            <div key={marker._id} > {
              <Marker 
                position={marker.address.location.coordinates} 
                icon={getIconMarker(marker.type_object[0].icon)}>
                <Popup><span className='pop-up' onClick={() => {openModal(marker)}}>{marker.name}</span></Popup>
              </Marker>
              }
            </div>
            ))
          ) : 
          <div className='spinner'>
            <Spinner color='primary'>
              Loading...
            </Spinner>
          </div>
        }
        </div>
      </MapSagit>
    </section>
  );
};

export default MapView;
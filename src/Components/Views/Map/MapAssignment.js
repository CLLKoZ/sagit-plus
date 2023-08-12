import React, { useEffect, useState } from 'react';
import Header from '../../Structure/Header/Header';
import MapSagit from '../../Structure/General/MapSagit';
import EditAssignation from '../../Structure/AssignmentMap/EditAssignation';
import { ToastContainer } from 'react-toastify';
import { mdiClipboardAccount} from '@mdi/js';
import PanelAssignment from '../../Structure/AssignmentMap/PanelAssignment';
import { AssignmentMove, getAssignmentsByViewPort, findAssignment } from '../../../Functions/assignments';
import { Marker, Popup } from 'react-leaflet';
import { Spinner } from 'reactstrap';
import Icon from '@mdi/react';
import { GetPolygon, getObjectEvaluationByViewPort } from '../../../Functions';
import { icon } from 'leaflet';

import 'react-toastify/dist/ReactToastify.css';

const MapAssignment = () => {

  const [coordinates, setCoordinates] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [form, setForm] = useState(null);
  const [project, setProject] = useState(null);
  const [objects, setObjects] = useState(null);
  const [objectSelected, setObjectSelected] = useState(null);
  const [modal, setModal] = useState(false);
  const [mapFlag, setMapFlag] = useState(false);

  let status = {
    not: 'Sin iniciar',
    complete: 'Completada',
    init: 'Iniciada'
  }

  const customIcon = new icon({
    iconUrl: require(`../../../Images/Markers/domain-marker-base-blue.png`),
    iconSize: [25, 32]
  })

  useEffect(() => {
    document.title = "SAGIT | Asignaciones";
  }, []);

  useEffect(() => {
    console.log(objectSelected)
  }, [objectSelected])

  useEffect(() => {
    if (form !== null && project !== null && coordinates)
      getAssignmentsByViewPort(setObjects, coordinates, project, form);
    else if (coordinates)
      getObjectEvaluationByViewPort(setObjects, coordinates);
  }, [form, project, coordinates, objectSelected, mapFlag])

  useEffect(() =>{
    setObjectSelected(null)
  }, [form, project])

  const addObject = (object) => {
    let aux = true;
    if (!objectSelected && form && !object.status)
      setObjectSelected([object]);
    else if (form && !object.status)
      setObjectSelected(prevState => {
        prevState.forEach(prev => {
          if (prev._id === object._id)
            aux = false;
        })
        if (aux === true)
          return [...prevState, object];
        else
          return [...prevState]
      })
    else if(!objectSelected && form && object.status === status['not']){
      findAssignment(object._id, form, project, setAssignment);
      setModal(!modal);
    }
  }
  
  const closeModal=()=>{
      setModal(!modal);
  };
  
  return (
    <section>
      <div>
        <Header>
          <label htmlFor='btnActive' className="filtro">
            <Icon path={mdiClipboardAccount} size={1} />
            &nbsp;Asignar Inspección
          </label>
        </Header>
        <PanelAssignment 
          setProject={setProject} 
          setForm={setForm} 
          setObjectSelected={setObjectSelected}
          objectSelected={objectSelected}
        >
        </PanelAssignment>
        {
          form ? (
            <EditAssignation assignment={assignment} mapFlag={mapFlag} setMapFlag={setMapFlag} isOpenM={modal} toggleM={closeModal}/>
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
          {
            form && project != null ? (
              <AssignmentMove 
                setAssignment={setObjects}
                coor={coordinates}
                projectID={project}
                formID={form}
                setCoor={setCoordinates}
              />
            ) : (
              objects && (
                <GetPolygon estado={setObjects} setCoor={setCoordinates}/>
              )
            )
          }
          {
            objects != null ? (
              objects.map(object => (
                <div key={object._id} >
                  <Marker 
                    position={object.address.location.coordinates}
                    icon={object.icono ? object.icono : customIcon}
                  >
                    <Popup><h5 className='pop-up' onClick={() => addObject(object)}>{object.name}</h5></Popup>
                  </Marker>
                </div>
              ))
            ) : <div className='spinner'>
              <Spinner color='primary'>
                ...Loading
              </Spinner>
            </div>
          }
        </div>
      </MapSagit>
    </section>
  );
}

export default MapAssignment;

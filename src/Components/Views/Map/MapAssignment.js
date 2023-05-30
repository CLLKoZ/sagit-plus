import React, { useEffect, useState } from 'react';
import Header from '../../Structure/Header/Header';
import MapSagit from '../../Structure/General/MapSagit';
import { mdiClipboardAccount} from '@mdi/js';
import PanelAssignment from '../../Structure/AssignmentMap/PanelAssignment';
import { AssignmentMove, getAssignments, getAssignmentsByViewPort } from '../../../Functions/assignments';
import { Marker, Popup } from 'react-leaflet';
import { Spinner } from 'reactstrap';
import Icon from '@mdi/react';
import { GetPolygon, getObjectEvaluationByViewPort } from '../../../Functions';
import { icon } from 'leaflet';

const MapAssignment = () => {

  const [coordinates, setCoordinates] = useState(null);
  const [assignments, setAssignments] = useState(null);
  const [form, setForm] = useState(null);
  const [project, setProject] = useState(null);
  const [objects, setObjects] = useState(null);
  const [objectSelected, setObjectSelected] = useState(null);

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
      getAssignmentsByViewPort(setAssignments, coordinates, project, form);
    else if (coordinates)
      getObjectEvaluationByViewPort(setObjects, coordinates);
  }, [form, project, coordinates])

  useEffect(() =>{
    setObjectSelected(null)
  }, [form, project])

  console.log(assignments)

  const addAssign = (assign) => {
    let aux = true;
    if (!objectSelected && form && assign.status === status.not)
      setObjectSelected([assign]);
    else if (form && assign.status === status.not)
      setObjectSelected(prevState => {
        prevState.forEach(prev => {
          if (prev._id === assign._id)
            aux = false;
        })
        if (aux === true)
          return [...prevState, assign];
        else
          return [...prevState]
      })
  }
  
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
      </div>
      <MapSagit mapCoordinates={setCoordinates}>
        <div className='contenido'>
          {
            form && project != null ? (
              <AssignmentMove 
                setAssignment={setAssignments}
                coor={coordinates}
                projectID={project}
                formID={form}
              />
            ) : (
              objects && (
                <GetPolygon estado={setObjects}/>
              )
            )
          }
          {
            objects != null ? (
              objects.map(object => (
                <div key={object._id} >
                  <Marker 
                    position={object.address.location.coordinates}
                    icon={customIcon}
                  >
                    <Popup><h5 onClick={() => addAssign(object)}>{object.name}</h5></Popup>
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

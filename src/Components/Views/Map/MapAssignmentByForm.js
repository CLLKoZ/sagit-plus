import React, { useState } from 'react'
import Header from '../../Structure/Header/Header'
import Icon from '@mdi/react'
import { mdiClipboardAccount } from '@mdi/js'
import MapSagit from '../../Structure/General/MapSagit'
import { Spinner } from 'reactstrap'
import { Marker, Popup } from 'react-leaflet'
import PanelAssignmentByForm from '../../Structure/AssignmentMap/PanelAssignmentByForm'
import { AssignmentMove, getAssignmentsByForm } from '../../../Functions/assignments'
import { icon } from 'leaflet'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getForms } from '../../../Functions'
import ModalAssignmentByForm from '../../Structure/AssignmentMap/ModalAssignmentByForm'

export default function MapAssignmentByForm() {
  const [coordinates, setCoordinates] = useState();
  const [objects, setObjects] = useState(null);
  const [objectAssignments, setObjectAssignments] = useState(null);
  const [forms, setForms] = useState(null);
  const [project, setProject] = useState(null);
  const [objectSelected, setObjectSelected] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const customIcon = new icon({
    iconUrl: require(`../../../Images/Markers/domain-marker-base-blue.png`),
    iconSize: [25, 32]
  })

  useEffect(() => {
    console.log(project)
  }, [project])

  useEffect(() => {
    document.title = "SAGIT | Asignaciones Form";
    toast.info('Seleccione un proyecto', {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }, []);

  useEffect(() => {
    if (project !== null && coordinates)
      getAssignmentsByForm(setObjects, coordinates, project.value, getForms(project.value));
    if (project === null)
      setObjects(null);
  }, [project, coordinates]);

  const openModal = (object) => {
    setIsOpen(true);
    setObjectAssignments(object);
  }

  return (
    <>
      <div>
        <Header>
          <label htmlFor='btnActive' className="filtro">
            <Icon path={mdiClipboardAccount} size={1} />
            &nbsp;Asignar Inspección
          </label>
        </Header>
        <PanelAssignmentByForm 
          setProject={setProject} 
          setForm={setForms} 
          objectSelected={objectSelected} 
          setObjectSelected={setObjectSelected}
        />
        {
          project && (
            <ModalAssignmentByForm isOpen={isOpen} setIsOpen={setIsOpen} modalAssignments={objectAssignments} projectName={project.label}/>
          )
        }
      </div>
      <MapSagit mapCoordinates={setCoordinates}>
      <div className='contenido'>
          {
            project != null && (
              <AssignmentMove 
                setAssignment={setObjects}
                setCoor={setCoordinates}
                projectID={project.value}
              />
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
                    <Popup><h5 className='pop-up' onClick={()=> openModal(object)}>{object.name}</h5></Popup>
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
    </>
  )
}
import React, { useState } from 'react'
import Header from '../../Structure/Header/Header'
import Icon from '@mdi/react'
import { mdiClipboardAccount } from '@mdi/js'
import PanelAssignment from '../../Structure/AssignmentMap/PanelAssignment'
import MapSagit from '../../Structure/General/MapSagit'
import { Spinner } from 'reactstrap'
import { Marker, Popup } from 'react-leaflet'
import PanelAssignmentByForm from '../../Structure/AssignmentMap/PanelAssignmentByForm'
import { AssignmentMove, getAssignmentsByViewPort } from '../../../Functions/assignments'
import { GetPolygon, getObjectEvaluationByViewPort } from '../../../Functions'
import { icon } from 'leaflet'
import { useEffect } from 'react'

export default function MapAssignmentByForm() {
  const [coordinates, setCoordinates] = useState();
  const [objects, setObjects] = useState(null);
  const [assignment, setAssignment] = useState(null);
  const [form, setForm] = useState(null);
  const [project, setProject] = useState(null);

  const customIcon = new icon({
    iconUrl: require(`../../../Images/Markers/domain-marker-base-blue.png`),
    iconSize: [25, 32]
  })

  useEffect(() => {
    document.title = "SAGIT | Asignaciones Form";
  }, []);

  useEffect(() => {
    if (form !== null && project !== null && coordinates)
      getAssignmentsByViewPort(setObjects, coordinates, project, form);
    else if (coordinates)
      getObjectEvaluationByViewPort(setObjects, coordinates);
  }, [form, project, coordinates])

  return (
    <>
      <div>
        <Header>
          <label htmlFor='btnActive' className="filtro">
            <Icon path={mdiClipboardAccount} size={1} />
            &nbsp;Asignar Inspección
          </label>
        </Header>
        <PanelAssignmentByForm/>
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
                    icon={object.icono ? object.icono : customIcon}
                  >
                    <Popup><h5 className='pop-up'>{object.name}</h5></Popup>
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
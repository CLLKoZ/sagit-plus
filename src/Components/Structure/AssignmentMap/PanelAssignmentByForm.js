import React, { useEffect, useState } from 'react'
import Panel from '../General/Panel'
import Select from 'react-select';
import { getProjects, getUsers } from '../../../Functions';
import Icon from '@mdi/react';
import { mdiCloseCircle, mdiMapMarkerAlert } from '@mdi/js';

export default function PanelAssignmentByForm({children, setProject, setObjectSelected, objectSelected = null}) {
  const [idProject, setIdProject] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [objectPanel, setObjectPanel] = useState(null);
  const [defaultOptions, setDefaultOptions] = useState([{ label: 'Seleccione una opción', value: null },]);
  const [selectedUser, setSelectedUser] = useState(null);

/* Estilos del componente Select */
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#D1D4D8' : 'white',
      color: 'black',
      textAlign: 'left',
      height: '25px',
      paddingTop:'0px',
    }),
    input: (provided) => ({
      ...provided,
      color: '#D1D4D8',
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: 'left',
      color: '#D1D4D8',
    }),
  };

  useEffect(() => {
    setObjectPanel(objectSelected);
  }, [objectSelected])

  /* Este useEffect se utiliza para obtener el listado de usuarios */
  useEffect(()=>{
    getUsers(setUsers);
  }, [])

  useEffect(()=>{
    console.log(selectedProject)
  }, [selectedProject])
  
  const deleteObject = () =>{
    setObjectSelected(null);
    setObjectPanel(null);
  }

  return (
    <Panel>
      <div className ='formulario'>
        <label className ='labelPanel'>Proyecto:</label>
        <Select
            value={selectedProject ? selectedProject : defaultOptions}
            options = {
              getProjects().length > 0 
              ? [
                  { label: "Seleccione una opción", value: null },
                  ...getProjects().map(project => ({
                    label: project.name, 
                    value: project._id
                  })),
                ]
              : [{ label: "No tiene proyectos asignados", value: null }]
            }
            onChange = {(selectedOption) => {
              setIdProject(selectedOption.value);
              setProject(selectedOption.value);
              if (selectedOption.value === "") {
                setIdProject(null);
                setProject(null);
              }
              setSelectedProject(selectedOption);
            }}
            styles = {selectStyles}         
        />

        <label className='labelPanel'>Formularios:</label>

        <label className='labelPanel'>Inspector:</label>
        <Select
            value={selectedUser ? selectedUser : defaultOptions}
            options = {
              users !== null && (
                [
                  { label: "Seleccione una opción", value: null },
                  ...users.map(user => ({label: user.firstName + ' '+ user.lastName, value: user._id})),
                ]
              )
            }
            onChange = {(selectedOption) => {
              setSelectedUser(selectedOption);
            }}
            styles = {selectStyles}         
        />
        
        <label className='labelPanel'>
          Objecto de evaluación:
        </label>
        {
          objectPanel != null ? (
            <label className='p-object'>
            <span className='delete-object' onClick={() => deleteObject()}>
                <Icon path={mdiCloseCircle} size={1}/>
              </span>
              &nbsp;{objectSelected.name}
            </label>
          ) :  
          <label className='p-object'>
            Seleccione un objeto de evaluación <Icon path={mdiMapMarkerAlert} size={1}/>
          </label>
        }
      </div>
      
      <button 
        className='button create-assignment'
      >Crear</button>
    </Panel>
  )
}

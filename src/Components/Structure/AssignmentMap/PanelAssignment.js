import React, { useEffect, useState } from 'react';
import './style.css';
import Panel from '../General/Panel';
import { getForms, getUsers, getProjects} from '../../../Functions';
import Select from 'react-select';
import Icon from '@mdi/react';
import { mdiCloseCircle, mdiMapMarkerAlert } from '@mdi/js';
import { createAssign } from '../../../Functions/assignments';

const PanelAssignment = ({ children, setForm, setProject, setObjectSelected, objectSelected = null }) => {
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
  
  /* Este useEffect se utiliza para detectar el cambio del idProyecto seleccionado, y setear opciones default en formulario */
  useEffect(() => {
    setSelectedForm(defaultOptions);
  }, [idProject, defaultOptions]);

  const deleteObject = (object) =>{
    setObjectSelected(prevState => {
      const newState = prevState.filter(id=> id != object);
      return newState;
    })
  }

  return(
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

        <label className='labelPanel'>Formulario:</label>
        <Select
          value = {selectedForm}
          options = {
            idProject && getForms(idProject).length > 0
              ? [
                  { label: "Seleccione una opción", value: null },
                  ...getForms(idProject).map((form) => ({
                    label: form.name,
                    value: form._id,
                  })),
                ]
              : [{ label: "Seleccione un proyecto", value: null }]
          }
          onChange = {(selectedOption) => {
            setSelectedForm(selectedOption);
            setForm(selectedOption.value);
          }}
          styles = {selectStyles}
        />

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
          Inspecciones:
        </label>
        {
          objectPanel != null ? (
            objectPanel.map(object => (
              <div key={object._id}>
                <label className='p-object'>
                <span className='delete-object' onClick={() => deleteObject(object)}>
                    <Icon path={mdiCloseCircle} size={1}/>
                  </span>
                  &nbsp;{object.name}
                </label>
              </div>
            ))
          ) :  
          <label className='p-object'>
            Seleccion objetos de evaluación <Icon path={mdiMapMarkerAlert} size={1}/>
          </label>
        }
      </div>
      
      <button 
        className='button create-assignment' 
        onClick={()=>{
          createAssign(idProject, selectedForm?.value, selectedUser?.value, objectPanel);
          setObjectSelected(null);
          setSelectedUser(defaultOptions);
        }}
      >Crear</button>
      <button 
        className='button clean-assignment' 
        onClick={()=>{          
          setObjectSelected(null);
          setSelectedUser(defaultOptions);
          setSelectedForm(defaultOptions);
          setSelectedProject(defaultOptions);
          setForm(null);
          setProject(null);
        }}
      >Limpiar</button>
    </Panel>
  );
};

export default PanelAssignment;
import React, { useEffect, useState } from 'react';
import './style.css';
import Panel from '../General/Panel';
import Axios from '../../../API/Axios';
import { getCurrentUser } from '../../../Functions';
import Select from 'react-select';

const PanelAssignment = ({ children }) => {
  const [projects, setProjects] = useState(null);
  const [idProject, setIdProject] = useState(null);
  const [forms, setForms] = useState(null);
  const [users, setUsers] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [defaultOptions, setDefaultOptions] = useState([{ label: 'Seleccione una opción', value: null },]);

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

  /* Este useEffect se utiliza para obtener el listado de proyectos */
  useEffect(()=>{
    const getProyects = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body = {
        "filter": {},
        "regex": [],
        "populate": [{ "path": "institution", "select": "name" }],
        "attributes": [],
        "pageNumber": 1,
        "limit": 100
      }
      try {
        const response = await Axios.post('/project/find', body, {headers});
        setProjects(response.data.data);
      } catch (error) {
        console.log("Algo salió mal");
        console.log(error);
      }
    }
    getProyects();
  }, [])

  /* Este useEffect se utiliza para obtener el listado de formularios a partir del proyecto */
  useEffect(()=>{
    const getForms = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body = {
      "filter": {"projects":idProject},
      "regex" : [],
      "populate": [],
      "attributes": [],
      "pageNumber": 1,
      "limit": 2000
    }
      try {
        const response = await Axios.post('/form-inspection/find', body, {headers});
        setForms(response.data.data);
      } catch (error) {
        console.log("Algo salió mal");
        console.log(error);
      }
    }
    getForms();
  }, [idProject])

  /* Este useEffect se utiliza para obtener el listado de usuarios */
  useEffect(()=>{
    const getUsers = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body = {
        "filter":{},
        "regex": [],
        "populate": [],
        "attributes": [],
        "pageNumber": 1,
        "limit": 1000
      }
      try {
        const response = await Axios.post('/user/find', body, {headers});
        setUsers(response.data.data);
      } catch (error) {
        console.log("Algo salió mal");
        console.log(error);
      }
    }
    getUsers();
  }, [])
  
  /* Este useEffect se utiliza para detectar el cambio del idProyecto seleccionado, y setear opciones default */
  useEffect(()=>{
    setSelectedForm(defaultOptions);
  }, [idProject, defaultOptions])

  return(
    <Panel>
      <div className ='formulario'>
        <label className ='labelPanel'>Proyecto:</label>
        <Select
            defaultValue = {defaultOptions}
            options = {projects != null && (projects.map(project=>({label: project.name, value: project._id})))}
            onChange = {(selectedOption) => {
              setIdProject(selectedOption.value);
              if (selectedOption.value === "") {
                setIdProject(null);
              }
            }}
            styles={selectStyles}         
        />

        <label className='labelPanel'>Formulario:</label>
        <Select
          value = {selectedForm}
          options = {idProject ? forms !== null && forms.map(form => ({ label: form.name, value: form._id })):[{ label: "Seleccione un proyecto primero", value: null }]}
          onChange = {selectedOption => {
            setSelectedForm(selectedOption);
          }}
          styles={selectStyles}
        />

        <label className='labelPanel'>Inspector:</label>
        <Select
            defaultValue={defaultOptions}
            options={users != null && (users.map(user=>({label: user.firstName + ' '+ user.lastName, value: user._id})))}
            styles={selectStyles}         
        />
        
        <label className='labelPanel'>Inspecciones:</label>
      </div>
      
      <button className='create-assignment'>Crear</button>
    </Panel>
  );
};

export default PanelAssignment;
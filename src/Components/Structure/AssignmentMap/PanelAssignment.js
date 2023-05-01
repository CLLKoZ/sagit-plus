import React, { useEffect, useState } from 'react';
import './style.css';
import Panel from '../General/Panel';
import Axios from '../../../API/Axios';
import { getCurrentUser, getForms, getProjects} from '../../../Functions';
import Select from 'react-select';

const PanelAssignment = ({ children }) => {
  const [idProject, setIdProject] = useState(null);
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
  
  /* Este useEffect se utiliza para detectar el cambio del idProyecto seleccionado, y setear opciones default en formulario */
  useEffect(() => {
    setSelectedForm(defaultOptions);
  }, [idProject, defaultOptions]);

  return(
    <Panel>
      <div className ='formulario'>
        <label className ='labelPanel'>Proyecto:</label>
        <Select
            defaultValue = {defaultOptions}
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
              if (selectedOption.value === "") {
                setIdProject(null);
              }
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
          }}
          styles = {selectStyles}
        />

        <label className='labelPanel'>Inspector:</label>
        <Select
            defaultValue = {defaultOptions}
            options = {
              users !== null && (
                [
                  { label: "Seleccione una opción", value: null },
                  ...users.map(user => ({label: user.firstName + ' '+ user.lastName, value: user._id})),
                ]
              )
            }
            styles = {selectStyles}         
        />
        
        <label className='labelPanel'>Inspecciones:</label>
      </div>
      
      <button className='create-assignment'>Crear</button>
    </Panel>
  );
};

export default PanelAssignment;
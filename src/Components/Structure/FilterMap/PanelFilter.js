import React, {useState, useEffect} from 'react';
import { getCurrentUser, setFormID } from '../../../Functions';
import Axios from '../../../API/Axios';
import Filtros from './Filters';
import './style.css';
import Panel from '../General/Panel';
import Select from 'react-select';

const PanelFiltroMapa = ({state, setFiltro, setChangeMap}) => {
  const [forms, setForms] = useState(null);
  const [selects, setSelects] = useState();
  const [formFiltro, setFormFiltro] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
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

  useEffect(() => {
    setForms(getCurrentUser().session.forms)
  }, []);

  useEffect(() => {
    setFiltro(currentFilter)
  }, [currentFilter, setFiltro, setChangeMap])

  useEffect(() =>{
    setFormID(selects)
    if (selects){
      const getCurrentForm = async() => {
        const headers={
          Authorization: getCurrentUser().session.token
        }
        const body={
          "filter": {"_id": selects},
          "regex": [],
          "populate": [],
          "attributes": [],
          "pageNumber": 1,
          "limit": 5
        }
        try {
          const response = await Axios.post('/form-inspection/find', body, {headers});
          const formData = {
            id: response.data.data[0]._id,
            sections: response.data.data[0].sections,
            name: response.data.data[0].name,
            isActive: response.data.data[0].isActive,
          }
          state(formData)
          setFormFiltro(formData)
        } catch (error) {
          console.log("algo salió mal");
          console.log(error);
        }
      };
  
      getCurrentForm();
    }
  }, [selects, state]);

  return(
    /* Estructura de Filtro para datos en el mapa */
    <Panel>
      <div className='formulario'>
        <label className='labelPanel'>Formularios:</label>
        <Select
            defaultValue = {defaultOptions}
            options = {forms != null && (forms.map(form=>({label: form.name, value: form._id, key: form._id})))}
            onChange = {(selectedOption) => {
              setSelects(selectedOption.value)
              if(selectedOption.value === "") {
                setFormFiltro(null);
                state(null);
              }}}
            styles={selectStyles}         
        />
      </div>
      <div className='filtro-select'>
        <Filtros formFiltro={formFiltro} setFilter={setCurrentFilter}/>
      </div>
    </Panel>
  );
};

export default PanelFiltroMapa;
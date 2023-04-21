import React, {useState, useEffect} from 'react';
import '../../Estilos/panelFiltroMapa.css'
import {getCurrentUser} from '../../Funciones/user'
import { setFormID } from '../../Funciones/ObjectEvaluation';
import Axios from '../../API/Axios';
import Filtros from './Filtros';
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

const PanelFiltroMapa = ({state, setFiltro, setChangeMap}) => {

  const [forms, setForms] = useState(null);
  const [selects, setSelects] = useState();
  const [formFiltro, setFormFiltro] = useState(null);
  const [currentFilter, setCurrentFilter] = useState(null);
  const [change, setChange] = useState(false);

  useEffect(() => {
    setForms(getCurrentUser().session.forms)
  }, []);

  useEffect(() => {
    setChangeMap(change)
    setFiltro(currentFilter)
  }, [currentFilter, setFiltro, change, setChangeMap])

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
    <section>
      <input type="checkbox" id="btnFiltro"/>
      <div className='container-filtro'>
        <div className='cont-filtro'>
        <div className='formulario'>
          <label className='labelFiltro'>Formularios:</label>
          <select className='selectFiltro' onChange={e => {
            setSelects(e.target.value)
            if(e.target.value === "") {
              setFormFiltro(null)
              state(null)
            }}}>
            <option value="" key="" >Seleccione una opción</option>
            {
              forms != null && (forms.map(form=>(
                <option value={form._id} key={form._id}>{form.name}</option>
              )))
            }
          </select>
        </div>
          <div className='filtro-select'>
            <Filtros formFiltro={formFiltro} setFilter={setCurrentFilter} setChangePanel={setChange}/>
          </div>
          <label htmlFor='btnFiltro' className='closeFiltro'><Icon path={mdiCloseCircle} size={1.4} /></label>
        </div>
      </div>
    </section>
  );
};

export default PanelFiltroMapa;
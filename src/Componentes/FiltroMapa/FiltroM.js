import React, {useState, useEffect} from 'react';
import '../../Estilos/panelFiltroMapa.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {getCurrentUser} from '../../Funciones/funciones'
import { setFormID } from '../../Funciones/ObjectEvaluation';
import Axios from '../../API/Axios';

const PanelFiltroMapa = ({state}) => {

  const [forms, setForms] = useState(null);
  const [selects, setSelects] = useState();

  useEffect(() => {
    setForms(getCurrentUser().session.forms)
  }, []);

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
          <div>
            <form>
              <label className='labelFiltro'>Formularios:</label>
              <select className='selectFiltro' onChange={e => {
                setSelects(e.target.value)}}>
                <option value="" key="" >Seleccione una opción</option>
                {
                  forms != null ? (forms.map(form=>(
                    <option value={form._id} key={form._id}>{form.name}</option>
                  ))) : "Cargando..."
                }
              </select>
              <label className='labelFiltro'>Prueba 4</label>
              <input className='inputFiltro' type="text"></input>
              <div className='contenedorBoton'>
                <button className="btnFiltrar" type='submit'>Filtrar</button>
              </div>
            </form>
          </div>
          <label htmlFor='btnFiltro' className='closeFiltro'><FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon></label>
        </div>
      </div>
    </section>
  );
};

export default PanelFiltroMapa;
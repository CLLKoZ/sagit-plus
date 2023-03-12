import React from 'react';
import '../../Estilos/panelFiltroMapa.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';

const PanelFiltroMapa = () => {

  return(
    /* Estructura de Filtro para datos en el mapa */
    <section>
      <input type="checkbox" id="btnFiltro"/>
      <div className='container-filtro'>
        <div className='cont-filtro'>
          <div>
            <form>
              <label className='labelFiltro'>Prueba 1</label>
              <input className='inputFiltro' type="text"></input>
              <label className='labelFiltro'>Prueba 2</label>
              <input className='inputFiltro' type="text"></input>
              <label className='labelFiltro'>Prueba 3</label>
              <select className='selectFiltro'>
                <option>Valor 1</option>
                <option>Valor 2</option>
                <option>Valor 3</option>
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
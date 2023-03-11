import React from 'react';
import '../../Estilos/header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';

/* Estructura de Filtro para datos en el mapa */
const FiltroMapa = () => {

  return(
    <section>
      <input type="checkbox" id="btnFiltro"/>
      <div className='container-filtro'>
        <div className='cont-filtro'>
          <nav>
            <form>
              <label>Prueba 1</label>
              <input type="text"></input>
              <label>Prueba 2</label>
              <input type="text"></input>
              <label>Prueba 3</label>
              <input type="text"></input>
              <label>Prueba 4</label>
              <input type="text"></input>
              <button type='submit'>Filtrar</button>
            </form>
          </nav>
          <label htmlFor='btnFiltro' className='closeFiltro'><FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon></label>
        </div>
      </div>
    </section>
  );
};

export default FiltroMapa;
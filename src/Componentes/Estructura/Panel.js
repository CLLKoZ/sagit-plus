import React from 'react';
import '../../Estilos/panel.css'
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

const Panel = ({}) => {

  return(
    /* Estructura de Filtro para datos en el mapa */
    <section>
      <input type="checkbox" id="btnFiltro"/>
      <div className='container-filtro'>
        <div className='cont-filtro'>
        <div className='formulario'>

        </div>
          <label htmlFor='btnFiltro' className='closeFiltro'><Icon path={mdiCloseCircle} size={1.4} /></label>
        </div>
      </div>
    </section>
  );
};

export default Panel;
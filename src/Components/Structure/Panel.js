import React from 'react';
import '../../Styles/panel.css'
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

const Panel = ({ children }) => {

  return(
    /* Estructura de Filtro para datos en el mapa */
    <section>
      <input type="checkbox" id="btnActive"/>
      <div className='container-panel'>
        <div className='cont-panel'>
          {children}
          <label htmlFor='btnActive' className='closePanel'><Icon path={mdiCloseCircle} size={1.4} /></label>
        </div>
      </div>
    </section>
  );
};

export default Panel;
import React from 'react';
import '../../../Styles/panel.css'
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';
import Panel from '../Panel';

const PanelAssignment = ({ children }) => {

  return(
    <Panel>
      <div className='formulario'>
        <label className='labelFiltro'>Proyecto:</label>
      </div>
    </Panel>
  );
};

export default PanelAssignment;
import React, { useEffect, useState } from 'react';
import Header from '../../Structure/Header/Header';
import MapSagit from '../../Structure/MapSagit';
import Icon from '@mdi/react';
import { mdiFilterMultiple } from '@mdi/js';
import PanelAssignment from '../../Structure/AssignmentMap/PanelAssignment';

const MapAssignment = () => {

  const [coordinates, setCoordinates] = useState();

  useEffect(() => {
    document.title = "SAGIT | Asignaciones";
  }, []);

  
  return (
    <section>
      <div>
        <Header>
          <label htmlFor='btnActive' className="filtro">
            <Icon path={mdiFilterMultiple} size={1} />
            &nbsp;Asignar Inspección
          </label>
        </Header>
        <PanelAssignment>

        </PanelAssignment>
      </div>
      <MapSagit mapCoordinates={setCoordinates}>
        
      </MapSagit>
    </section>
  );
}

export default MapAssignment;

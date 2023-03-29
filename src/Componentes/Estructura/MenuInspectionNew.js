import React, { useEffect, useState } from 'react';
import { Accordion, AccordionHeader, AccordionItem,} from 'reactstrap';

import '../../Estilos/modalInspection.css';

const MenuInspection = ({inspectionMenu}) => {
  const [currentInspection, setCurrentInspection] = useState(null);

  useEffect(() => {
    setCurrentInspection(inspectionMenu)
  }, [inspectionMenu])
  
    return (
      <section>
        
      </section>
    );
};

export default MenuInspection;

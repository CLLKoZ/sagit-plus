import React, { useState } from 'react';
import { Accordion,AccordionHeader,AccordionItem,} from 'reactstrap';

import '../../Estilos/modalInspection.css';

const MenuInspection = () => {
    const [open, setOpen] = useState('1');
    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };
  
    return (
      <div>
        <Accordion open={open} toggle={toggle}>
          <AccordionItem>
            <AccordionHeader targetId="1">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="2">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="3">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="4">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="5">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="6">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="7">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="8">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="9">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="10">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="11">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          <AccordionItem>
            <AccordionHeader targetId="12">Estado<br/>Creada: 7/3/2023, 17:50:10<br/>Inspector: Nombre</AccordionHeader>
          </AccordionItem>
          
        </Accordion>
      </div>
    );
};

export default MenuInspection;

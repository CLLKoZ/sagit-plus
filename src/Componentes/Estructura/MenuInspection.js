import React, { useEffect, useState } from 'react';
import { Accordion,AccordionHeader,AccordionItem,} from 'reactstrap';
import '../../Estilos/modalInspection.css';
import Supervisor from '../../Funciones/Supervisor';

const MenuInspection = (props) => {
    const [open, setOpen] = useState('1');
    const [inspection, setInspection] = useState(null);
    const toggle = (id) => {
      if (open === id) {
        setOpen();
      } else {
        setOpen(id);
      }
    };
    useEffect(()=>{
      const sortedInspection = [...props.inspection].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInspection(sortedInspection);
    }, [props.inspection]);
    
    const getStatus = (isFull) => {
      if (isFull > 0){
        return 'Finalizada'
      }else{
        return 'En progreso'
      }
    }
    
    function formatDate(fecha){
      const date = new Date(fecha);
      const hora = date.getUTCHours(); // obtiene la hora en formato de 24 horas de acuerdo a la zona horaria local del equipo
      const minuto = date.getUTCMinutes(); // obtiene los minutos de acuerdo a la zona horaria local del equipo
      const segundo = date.getUTCSeconds(); // obtiene los segundos de acuerdo a la zona horaria local del equipo
      const tiempo = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
      return date.toLocaleDateString()+', '+tiempo;
    }
      
    return (
      <section>
        { 
          inspection ? (
            inspection.map(item => (
              <div key={item._id}>
                <Accordion open={open} toggle={toggle}>
                  <AccordionItem>
                    <AccordionHeader targetId = {item._id}>{getStatus(item.inspectionFull.length)}<br/>Creada: {formatDate(item.createdAt)}<br/>Inspector: <Supervisor inspectionID={item._id}></Supervisor></AccordionHeader>
                  </AccordionItem>
                </Accordion>
              </div>
            ))
          ):('Algo salió mal...')
        }
      </section>
    );
};

export default MenuInspection;

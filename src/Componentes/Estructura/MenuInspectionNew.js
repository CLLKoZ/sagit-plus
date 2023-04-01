import React, { useEffect, useState } from 'react';
import { Accordion,AccordionHeader,AccordionItem,} from 'reactstrap';
import '../../Estilos/modalInspection.css';
import Supervisor from '../../Funciones/Supervisor';

/*Se pasa el Parametro ins que es la inspeccion seleccionada en el mapa
  También Pasamos como un parametro al componente MenuInspection la función handleOptionMenuClick para obtener el id de la seleccion
*/
const MenuInspection = ({inspectionMenu, setSelect}) => {
    const position=(inspectionMenu.length)-1;
    const [open, setOpen] = useState(inspectionMenu[position]?._id);
    const [inspection, setInspection] = useState(null);

    const toggle = (id) => {
      setOpen(id);
    };

    const setSelected = (selectedIns) => {
      setSelect(selectedIns);
    }
    
    useEffect(()=>{
      const sortedInspection = [...inspectionMenu].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInspection(sortedInspection);
    }, [inspectionMenu]);
    
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
            inspection.map((item) => (
              <div key={item._id}>
                <Accordion open={open} toggle={toggle} onClick={() => {setSelected(item)}}>
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

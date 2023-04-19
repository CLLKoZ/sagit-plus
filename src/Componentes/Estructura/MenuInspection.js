import React, { useEffect, useState } from 'react';
import { Accordion,AccordionHeader,AccordionItem,} from 'reactstrap';
import '../../Estilos/modalInspection.css';
import Supervisor from '../../Funciones/Supervisor';

/*Se pasa el Parametro ins que es la inspeccion seleccionada en el mapa
  También Pasamos como un parametro al componente MenuInspection la función handleOptionMenuClick para obtener el id de la seleccion
*/
const MenuInspection = ({ins, handleOptionMenuClick}) => {
    const [open, setOpen] = useState(ins[ins.length-1]?._id); //Asignamos el primer id del arreglo como estado cn valor inicial
    const [inspection, setInspection] = useState(null);

    /*Esta función se utiliza para recibir el id de la opción seleccionada en el menu de inspecciones/Accordion y asignarselo a un estado de opción activa*/
    const toggle = (id) => {
      setOpen(id);
    };
    
    /*En esta funcion recibe el parámetro del id seleccionado*/
    const setSelectedInspection = (selectedIns) => {
      handleOptionMenuClick(selectedIns);
    }

    /* Este useEffect se utiliza para actualizar en orden descendente la lista de inspecciones, cuando el arreglo de inspecciones denominado ins cambie su valor*/ 
    useEffect(()=>{
      const sortedInspection = [...ins].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setInspection(sortedInspection);
    }, [ins]);
    
    /* Esta función recibe de parametro del tamaño del arreglo isFull, para determinar el estado de la inspección*/
    const getStatus = (isFull) => {
      if (isFull > 0){
        return 'Finalizada'
      }else{
        return 'En progreso'
      }
    }
    
    /* Esta función se utiliza para dar el formato de la fecha de la inspección, teniendo en cuenta la zona horaria del equipo y un formato de 24 horas */
    function formatDate(fecha){
      const date = new Date(fecha);
      const hora = date.getHours(); // obtiene la hora en formato de 24 horas de acuerdo a la zona horaria local del equipo
      const minuto = date.getMinutes(); // obtiene los minutos de acuerdo a la zona horaria local del equipo
      const segundo = date.getSeconds(); // obtiene los segundos de acuerdo a la zona horaria local del equipo
      const tiempo = `${hora.toString().padStart(2, '0')}:${minuto.toString().padStart(2, '0')}:${segundo.toString().padStart(2, '0')}`;
      return date.toLocaleDateString()+', '+tiempo;
    }   

    return (
      <section>
        { 
          /*
            Aqui se renderiza todas las inspecciones pertenecientes al objeto de evaluación seleccionado
            En el componente Supervisor se pasan los siguiente parámetros:
              inspectionID = Es el id de la inspeccion seleccionada en el menu para poder obtener el arreglo los supervisores de la inspeccion
          */
          inspection ? (
            inspection.map((item) => (
              <div key={item._id}>
                <Accordion open={open} toggle={toggle} onClick={() => {setSelectedInspection(item)}}>
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

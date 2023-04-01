import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';
import '../../Estilos/modalInspection.css';

const CardInspection = ({selectedInspection=null, firstInspection}) => {
  const [selectInspection, setSelectInspection] = useState();

  /*
    Este useEffect se utiliza para cambiar el estado de selectInspection cuando firstInspection o selectedInspection cambian
    designando la primera inspeccion si no hay una inspeccin seleccionada todavia
  */
  useEffect(() => {
    if (!selectedInspection) {
      setSelectInspection(firstInspection);
    } else {
      setSelectInspection(selectedInspection);
    }
  }, [firstInspection, selectedInspection])

  return (
    <section>
      { 
        /*
          
        */
        selectInspection ? ( 
          <Card className="card-container">
            <CardHeader>General</CardHeader>
            <CardBody className='card-content'>
              <Card className='card-elemento'>
                <CardSubtitle>Identificacion del edificio </CardSubtitle>
                <CardText>{selectInspection._id}</CardText>
                <Button>Button</Button>
              </Card>
            </CardBody>
          </Card>
        ) : ("Seleccione una inspección")
      }
    </section>
  );
};

export default CardInspection;










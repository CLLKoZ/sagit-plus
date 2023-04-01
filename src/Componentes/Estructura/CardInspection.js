import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';

import '../../Estilos/modalInspection.css';

const CardInspection = ({inspection, selectedOptionMenu}) => {
  const [contId, setContentId]=useState(null);
  useEffect (() => {
    setContentId(selectedOptionMenu);
  }, [selectedOptionMenu])

  console.log(selectedOptionMenu);
  console.log(inspection);

  return (
    <div>
      { 
       contId === '62436daaf36acd905e936e7e' ? (
              <Card className="card-container">
                <CardHeader>General</CardHeader>
                <CardBody className='card-content'>
                  <Card className='card-elemento'>
                    <CardSubtitle>Identificacion del edificio </CardSubtitle>
                    <CardText>{selectedOptionMenu}</CardText>
                    <Button>Button</Button>
                  </Card>
                </CardBody>
              </Card>
        ):('Seleccione una inspección')
      }
    </div>
      //elseif(selectedOptionMenu === '623d503af36acd905e936196')
  );
};

export default CardInspection;










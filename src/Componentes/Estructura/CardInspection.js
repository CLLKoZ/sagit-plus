import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';

import '../../Estilos/modalInspection.css';

const CardInspection = ({selectedInspection=null, firstInspection=null}) => {
  const [selectInspection, setSelectInspection] = useState();

  useEffect(() => {
    if (!selectedInspection) {
      setSelectInspection(firstInspection);
    } else {
      setSelectInspection(selectedInspection);
    }
  }, [firstInspection, selectedInspection])

  console.log(selectInspection?._id);
  console.log(firstInspection._id);
  return (
    <section>
      { 
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










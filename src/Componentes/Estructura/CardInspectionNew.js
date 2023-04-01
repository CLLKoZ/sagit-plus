import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';

import '../../Estilos/modalInspection.css';

const CardInspection = ({selected=null, first}) => {
  const [selectInspection, setSelectInspection] = useState();

  useEffect(() => {
    if (!selected) {
      setSelectInspection(first);
    } else {
      setSelectInspection(selected);
    }
  }, [first, selected])

  console.log(selectInspection)

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
        ) : ("No hay nadaaaaa")
      }
    </section>
  );
};

export default CardInspection;










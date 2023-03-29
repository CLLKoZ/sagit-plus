import React from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle, Button } from 'reactstrap';

import '../../Estilos/modalInspection.css';

  const CardInspection = () => {
  return (
    <div className='card'>
      <Card className="card-container">
          <CardHeader>General</CardHeader>
        <CardBody className='card-content'>
          <Card className='card-elemento'>
            <CardSubtitle>Identificacion del edificio</CardSubtitle>
            <CardText>Nombre edificio</CardText>
            <Button>Button</Button>
          </Card>
          <Card className='card-elemento'>
            <CardSubtitle>Identificacion del edificio</CardSubtitle>
            <CardText>Nombre edificio</CardText>
            <Button>Button</Button>
          </Card>
          
          <Card className='card-elemento'>
            <CardSubtitle>Identificacion del edificio</CardSubtitle>
            <CardText>Nombre edificio</CardText>
            <Button>Button</Button>
          </Card>
          <Card className='card-elemento'>
            <CardSubtitle>Identificacion del edificio</CardSubtitle>
            <CardText>Nombre edificio</CardText>
            <Button>Button</Button>
          </Card>
        </CardBody>
      </Card>
    </div>
  );
};

export default CardInspection;










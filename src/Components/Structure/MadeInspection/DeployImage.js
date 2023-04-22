import React, { useEffect, useState } from 'react';
import {Modal, ModalBody, ModalHeader} from 'reactstrap';

const DeployImage = ({imageName, imageSrc, isOpenI, toggleI}) => {
  const [scale, setScale] = useState(1);

  useEffect(()=>{
    setScale(1);
  }, [imageSrc, toggleI])

  const handleWheel = (event) => {
    // Ajustar el zoom de la imagen
    const newScale = scale + event.deltaY * -0.01;
    // Determinando la escala mínima y máxima
    if (newScale < 1) {
      setScale(1);
    } else if (newScale > 5) {
      setScale(5);
    } else {
      setScale(newScale);
    }
  };
    
  return (
    /* Aqui se renderiza la imagen que se presenta en el modal al querer verla en grande*/
    <section>
      <Modal className='mod-content' centered isOpen={isOpenI} toggle={toggleI}>
        <ModalHeader toggle={toggleI}>{imageName}</ModalHeader>
        <ModalBody className='image-inspection' onWheel={handleWheel}>
          <img alt={imageName} src={imageSrc} style={{ transform: `scale(${scale})` }}/>
        </ModalBody>
      </Modal>
    </section>
  );
}
 
export default DeployImage;
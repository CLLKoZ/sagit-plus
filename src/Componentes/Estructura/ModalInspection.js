import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import CardInspection from '../Estructura/CardInspection';
import MenuInspection from '../Estructura/MenuInspection';
import '../../Estilos/modalInspection.css';

const ModalInspection = (props) => {

  return (
    <div>
      <Modal className="modal-dialog-centered" isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Inspecciones Realizadas en Módulo de inspección:&nbsp;Prueba</ModalHeader>

        <ModalBody>
          <div className='menu-inspection'><MenuInspection/></div>
          <div className='bloc-inspection'><CardInspection/></div>
        </ModalBody>
      </Modal>
    </div>

    
  );
}

export default ModalInspection;
import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import CardInspection from '../Estructura/CardInspection';
import '../../Estilos/modalInspection.css';

const ModalInspection = (props) => {

  return (
    <div>
      <Modal className="modal-dialog-centered" isOpen={props.modal} toggle={props.toggle}>
        <ModalHeader toggle={props.toggle}>Inspecciones Realizadas</ModalHeader>
        <ModalBody>
          <select className='selectInspeccion'>
            <option value="" key="" >Seleccione una opción prueba prueba </option>
          </select>
          <h5 className='titulo-inspeccion'>Módulo de inspección:&nbsp;Prueba</h5>
          <div className='card contenido_scrollable'><CardInspection/></div>
        </ModalBody>
      </Modal>
    </div>

    
  );
}

export default ModalInspection;
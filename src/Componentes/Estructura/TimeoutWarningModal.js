import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../../Estilos/timeOutModal.css'

const TimeoutWarningModal = ({isOpen, onRequestClose}) => {
  const onLogOffCall = () => {
    // Implement your logout functionality here
    window.localStorage.removeItem('loggedUser');
    window.location.assign('/login');
  }

  return (
    <> 
      <Modal centered isOpen={isOpen} contentClassName='modal-size' style={{minWidth: '300px', maxWidth: '700px', width: '30%'}}>
        <ModalHeader className='modal-header-size'>La sesión expirará pronto</ModalHeader>
        <ModalBody >
          Ha permanecido mucho tiempo inactivo
          <br></br>
          ¿Desea extender o cerrar la sesión?
        </ModalBody>
        <ModalFooter>
          <button className='btn-color btn-custom' onClick={onRequestClose}>
            Extender
          </button>{' '}
          <Button color="danger" outline onClick={onLogOffCall}>
            Cerrar sesión
          </Button>
        </ModalFooter>
      </Modal>
    </>  
  );
}

export default TimeoutWarningModal;

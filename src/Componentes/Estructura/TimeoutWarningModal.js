import React from 'react';
import { Button, Modal } from 'reactstrap';

const TimeoutWarningModal = ({isOpen, onRequestClose}) => {
  const onLogOffCall = () => {
    // Implement your logout functionality here
    window.localStorage.removeItem('loggedUser');
    window.location.assign('/login');
  }

  return (
    <> 
      <Modal
        isOpen={isOpen}
      >
        <h2>Session Timeout</h2>
        <p>Tu sesión está por expirar</p>
        <p>¿Deseas extender o cerrar la sesión?</p>
        <br/>
        <Button color='primary' onClick={onRequestClose}>Extender</Button>
        <br></br>
        <Button  onClick={onLogOffCall}>Cerrar Sesión</Button>
      </Modal>
    </>  
  );
}

export default TimeoutWarningModal;

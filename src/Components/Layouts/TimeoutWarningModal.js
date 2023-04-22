import React from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import '../../Styles/timeOutModal.css'
import Icon from '@mdi/react';
import { mdiClockOutline, mdiLogout } from '@mdi/js';

const TimeoutWarningModal = ({isOpen, onRequestClose}) => {
  const onLogOffCall = () => {
    // Implement your logout functionality here
    window.localStorage.removeItem('loggedUser');
    window.location.assign('/login');
  }

  return (
    <> 
      <Modal centered isOpen={isOpen} contentClassName='modal-size' style={{minWidth: '300px', maxWidth: '700px', width: '30%'}}>
        <ModalHeader className='modal-header-size'>La sesión expirará pronto <Icon path={mdiClockOutline} size={1}/></ModalHeader>
        <ModalBody >
          <p>Ha permanecido mucho tiempo inactivo</p>
          <p>¿Desea extender o cerrar la sesión?</p>
        </ModalBody>
        <ModalFooter>
          <button className='btn-color btn-custom' onClick={onRequestClose}>
            Extender
          </button>{' '}
          <Button color="danger" outline onClick={onLogOffCall}>
            Cerrar sesión <Icon path={mdiLogout} size={1}/>
          </Button>
        </ModalFooter>
      </Modal>
    </>  
  );
}

export default TimeoutWarningModal;

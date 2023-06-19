import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const EditAssignation = ({ isOpenM, toggleM }) => {
  return (
    <section>
      <Modal isOpen={isOpenM} toggle={toggleM} centered>
        <ModalHeader toggle={toggleM}>
          Asignación
        </ModalHeader>
        <ModalBody></ModalBody>
      </Modal>
    </section>
  );
}

export default EditAssignation;
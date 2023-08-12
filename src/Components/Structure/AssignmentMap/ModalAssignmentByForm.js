import React from 'react'
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import ActionTable from './ActionTable';

import styles from './actionTable.module.css'
import Icon from '@mdi/react';
import { mdiCloseCircle } from '@mdi/js';

export default function ModalAssignmentByForm({ isOpen, setIsOpen, modalAssignments, projectName}) {
  const toggle = () => setIsOpen(!isOpen);

  const tableHeader = ["Formulario", "Estado", "Inspector", "Acciones"]
  const closeBtn = (
    <span style={{cursor: 'pointer', color: '#750000'}} onClick={toggle}>
      <Icon path={mdiCloseCircle} size={1.5}/>
    </span>
  );
  
  console.log(modalAssignments)

  return (
    <>
      <Modal isOpen={isOpen} centered toggle={toggle}>
        <div style={{height: '80vh'}}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          <b>{projectName}</b>
        </ModalHeader>
        <ModalBody>
          {
            modalAssignments && (
              <ActionTable header={tableHeader} assingments={modalAssignments.assignments}/>
            )
          }
        </ModalBody>
        </div>
      </Modal>
    </>
  )
}

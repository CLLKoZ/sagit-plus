import React from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';

const EditAssignation = ({ assignment, isOpenM, toggleM }) => {
  return (
    <section>
      { 
          /*
            Aqui se renderiza la asignacion del objeto seleccionado
          */
            assignment ? (
              assignment.map((item) => (
              <div key={item._id}>
                <Modal isOpen={isOpenM} toggle={toggleM} centered>
                  <ModalHeader toggle={toggleM}>
                    Asignación
                  </ModalHeader>
                  <ModalBody>
                  <div className ='formulario'>
                    <label className ='labelPanel'>Proyecto:</label>
                    <label className ='label-Content'>{item.projectName}</label>
                    <label className ='labelPanel'>Formulario:</label>
                    <label className ='label-Content'>{item.formInspectionName}</label>
                    <label className='labelPanel'>Inspector:</label>
                    <label className ='label-Content'>{item.supervisor.firstName + ' ' + item.supervisor.lastName}</label>
                    {/*<Select
                        value={selectedUser ? selectedUser : defaultOptions}
                        options = {
                          users !== null && (
                            [
                              { label: "Seleccione una opción", value: null },
                              ...users.map(user => ({label: user.firstName + ' '+ user.lastName, value: user._id})),
                            ]
                          )
                        }
                        onChange = {(selectedOption) => {
                          setSelectedUser(selectedOption);
                        }}
                        styles = {selectStyles}         
                      />*/}
                </div>
                <div className='container-Buttons'>
                    <button className='button-Options btnEdit'>Modificar</button>
                    <button className='button-Options btnDelete'>Eliminar</button>
                </div>
                  </ModalBody>
                </Modal>
              </div>
            ))
          ):('Algo salió mal...')
        }
    </section>
  );
}

export default EditAssignation;
import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import Select from 'react-select';
import {updateAssign, deleteAssign} from '../../../Functions/assignments';
import {getUsers} from '../../../Functions/user';

const EditAssignation = ({ assignment, isOpenM, toggleM }) => {
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null)

  /* Estilos del componente Select */
  const selectStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#D1D4D8' : 'white',
      color: 'black',
      textAlign: 'left',
      height: '25px',
      paddingTop:'0px',
    }),
    input: (provided) => ({
      ...provided,
      color: '#494848',
    }),
    singleValue: (provided) => ({
      ...provided,
      textAlign: 'left',
      color: '#494848',
    }),
    control: (provided) => ({
      ...provided,
      borderColor: '#e4e5e7 !important',
      borderRadius: '4px !important',
      boxShadow: 'none !important',
    }),
  };
  /* Este useEffect se utiliza para obtener el listado de usuarios */
  useEffect(()=>{
    getUsers(setUsers);
    setSelectedUser(null);
  }, [isOpenM])

  const handleDeleteAssign = (id) => {
    deleteAssign(id);
    toggleM();
  };

  const handleUpdateAssign = (idAssign, idSupervisor) => {
    if(idSupervisor)
      updateAssign(idAssign, idSupervisor);
    toggleM();
  };

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
                    <Select
                        value={selectedUser ? selectedUser : {label: `${item.supervisor.firstName} ${item.supervisor.lastName}`, value: item.supervisor._id}}
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
                      />
                </div>
                <div className='container-Buttons'>
                    <button className='button-Options btnEdit' 
                    onClick={() =>
                      selectedUser ? handleUpdateAssign(item._id, selectedUser['value']):toggleM()
                    }>Modificar</button>
                    <button className='button-Options btnDelete' onClick={() => handleDeleteAssign(item._id)}>Eliminar</button>
                </div>
                  </ModalBody>
                </Modal>
              </div>
            ))
          ):('')
        }
    </section>
  );
}

export default EditAssignation;
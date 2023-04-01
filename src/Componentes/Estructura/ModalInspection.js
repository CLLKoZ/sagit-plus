import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Spinner} from 'reactstrap';
import CardInspection from '../Estructura/CardInspection';
import MenuInspection from '../Estructura/MenuInspection';
import Axios from '../../API/Axios';
import {getCurrentUser} from '../../Funciones/funciones';
import '../../Estilos/modalInspection.css';
const ModalInspection = ({inspectionModal, isOpenM=false, toggleM, idForm, optionMenu, obtenerOptionMenu}) => {
  const [currentInspection, setCurrentInspection] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);

  //Funcion que llena el estado de la opcion del menu seleccionada
  const handleOptionMenuSelect = (targetid) => {
    obtenerOptionMenu(targetid);
  };

  useEffect(()=>{
    setCurrentInspection(inspectionModal)
  }, [inspectionModal])

  useEffect(()=>{
    const getCurrentForm = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body={
        "filter": {"_id": idForm},
        "regex": [],
        "populate": [],
        "attributes": [],
        "pageNumber": 1,
        "limit": 5
      }
      try {
        const response = await Axios.post('/form-inspection/find', body, {headers});
        setCurrentForm(response.data.data);
      } catch (error) {
        console.log("algo salió mal");
        console.log(error);
      }
    }
    getCurrentForm();
  }, [idForm])
console.log(optionMenu);
//console.log(isOpenM);
  return (
    <section>
      { 
        currentInspection ?
          (<Modal centered isOpen={isOpenM} toggle={toggleM}>
            <ModalHeader toggle={toggleM}>
              Inspecciones de {currentInspection.name} en el formulario {currentForm[0].name}
            </ModalHeader>
            <ModalBody>
              <div className='menu-inspection'><MenuInspection ins={currentInspection.inspection} handleOptionMenuClick={handleOptionMenuSelect}/></div>
              <div className='bloc-inspection'><CardInspection inspection={currentInspection.inspection} selectedOptionMenu={optionMenu}/></div>
            </ModalBody>
          </Modal>) : (
          <Modal isOpen={isOpenM} toggle={toggleM}>
            <Spinner color={'primary'}></Spinner>
          </Modal>)
      }
    </section>
  );
}

export default ModalInspection;
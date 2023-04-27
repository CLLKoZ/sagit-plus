import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Spinner} from 'reactstrap';
import FieldInspection from './FieldInspection';
import MenuInspection from './MenuInspection';
import Axios from '../../../API/Axios';
import {getCurrentUser} from '../../../Functions';
import DeployImage from './DeployImage';
import '../../../Styles/madeInspection.css';

const ModalInspection = ({inspectionModal, isOpenM=false, toggleM, idForm}) => {
  const [currentInspection, setCurrentInspection] = useState(null);
  const [currentForm, setCurrentForm] = useState(null); 
  const [optionMenu, setOptionMenu] = useState(null); //Este estado guarda la inspeccion seleccionada en el menu
  const [showImage, setShowImage] = useState(false); //Este estado guarda el booleano para mostrar la imagen en grande
  const [propsImage, setPropsImage] = useState ([]); //Este estado guarda las propiedades de la imagen

  /* Este useEffect se utiliza para cambiar el estado de optionMenu y currentInspection cada vez que el parametro inspectionModal cambie */
  useEffect(()=>{
    setCurrentInspection(inspectionModal)
    setOptionMenu(null)
  }, [inspectionModal])

  const closeImage=()=>{
    setShowImage(!showImage);
  };

  /* Este useEffect se utiliza para cambiar el estado de currentForm cada vez que cambia el parámetro idForm */
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
        console.log("Algo salió mal");
        console.log(error);
      }
    }
    getCurrentForm();
  }, [idForm])

  return (
    <section>
      { 
        /* Aqui se renderiza la información que se presenta en el modal al querer ver un punto de inspección*/
        currentInspection ?
          (<Modal className='modal-Inspection' centered isOpen={isOpenM} toggle={toggleM}>
            <ModalHeader toggle={toggleM}>
              Inspecciones de {currentInspection.name} en el formulario {currentForm[0].name}
            </ModalHeader>
            <ModalBody>
              <section className='menu-inspection'><MenuInspection ins = {currentInspection.inspection} handleOptionMenuClick = {setOptionMenu}/></section>
              <section className='bloc-inspection'><FieldInspection form = {currentForm[0]} selectedInspection = {optionMenu} firstInspection = {currentInspection.inspection[currentInspection.inspection.length-1]} handlePropsImage = {setPropsImage} handleClickOpenImage = {setShowImage}/></section>
              <section><DeployImage imageName = {propsImage[0]} imageSrc = {propsImage[1]} isOpenI={showImage} toggleI={closeImage}/></section>
            </ModalBody>
          </Modal>
          ) : (
          <Modal isOpen={isOpenM} toggle={toggleM}>
            <Spinner color={'primary'}></Spinner>
          </Modal>)
      }
    </section>
  );
}

export default ModalInspection;
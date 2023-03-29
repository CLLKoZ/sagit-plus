import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Spinner} from 'reactstrap';
import CardInspection from './CardInspection';
import MenuInspection from './MenuInspection';
import Axios from '../../API/Axios';
import {getCurrentUser} from '../../Funciones/funciones';
import '../../Estilos/modalInspection.css';

const ModalInspection = ({inspectionModal, isOpenM=false, toggleM, idForm}) => {
  const [currentInspection, setCurrentInspection] = useState(null);
  const [currentForm, setCurrentForm] = useState(null);

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

  return (
    <section>
      { 
        currentInspection ?
        (<Modal centered isOpen={isOpenM} toggle={toggleM}>
          <ModalHeader toggle={toggleM}>
            Inspecciones para<strong> {currentInspection.name} </strong>en el formulario<strong> {currentForm[0].name}</strong>
          </ModalHeader>
          <ModalBody>
            
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
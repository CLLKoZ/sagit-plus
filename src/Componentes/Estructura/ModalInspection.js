import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody, Spinner} from 'reactstrap';
import CardInspection from '../Estructura/CardInspection';
import MenuInspection from '../Estructura/MenuInspection';
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
              Inspecciones de {currentInspection.name} en el formulario {currentForm[0].name}
            </ModalHeader>
            <ModalBody>
              <div className='menu-inspection'><MenuInspection inspection={currentInspection.inspection}/></div>
                <div className='bloc-inspection'><CardInspection/></div>
            </ModalBody>
          </Modal>) : (
          <Modal isOpen={isOpenM} toggle={toggleM}>
            <Spinner color={'primary'}></Spinner>
          </Modal>)
      }
    </section>
  );
}

/*const ModalInspection = (props) => {
  const [form, setForm] = useState(null);
  //const idInspeccion=props.marcador;
  useEffect(()=>{
    const getForm = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body={
        "filter": {"_id":props.idForm},
        "regex": [],
        "populate": [],
        "attributes": [],
        "pageNumber": 1,
        "limit": 5
      }
      try {
        const response = await Axios.post('/form-inspection/find', body, {headers});
        setForm(response.data.data);
      } catch (error) {
        
      }
    }
    getForm()
    //console.log(form);
  }, [props.idForm]);
  console.log(props.marcador);
  return (
    <section>
      {
          form ? (
            form.map(item => (
              <div key={item._id}>
                <Modal className="modal-dialog-centered" isOpen={props.modal} toggle={props.toggle}>
                  <ModalHeader toggle={props.toggle}>Inspecciones Realizadas en formulario&nbsp;{item.name}</ModalHeader>
                  <ModalBody>
                    <div className='menu-inspection'><MenuInspection inspection={props.marcador}/></div>
                    <div className='bloc-inspection'><CardInspection/></div>
                  </ModalBody>
                </Modal>
              </div>
            ))
          ):('Algo salió mal...')
        }
    </section>
  );
}*/

export default ModalInspection;
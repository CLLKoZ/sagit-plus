import React, { useEffect, useState } from 'react';
import {Modal, ModalHeader, ModalBody} from 'reactstrap';
import CardInspection from '../Estructura/CardInspection';
import MenuInspection from '../Estructura/MenuInspection';
import Axios from '../../API/Axios';
import {getCurrentUser} from '../../Funciones/funciones';
import '../../Estilos/modalInspection.css';

const ModalInspection = (props) => {
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
}

export default ModalInspection;
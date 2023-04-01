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
  const [optionMenu, setOptionMenu] = useState(null); //Este estado guarda la inspeccion seleccionada en el menu

  /* Este useEffect se utiliza para cambiar el estado de optionMenu y currentInspection cada vez que el parametro inspectionModal cambie */
  useEffect(()=>{
    setCurrentInspection(inspectionModal)
    setOptionMenu(null)
  }, [inspectionModal])

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

  console.log('Modal id: '+optionMenu?._id);
  return (
    <section>
      { 
        /*
          Aqui se renderiza la información que se presenta en el modal al querer ver un punto de inspección
          En el componente MenuInspection se pasan los siguiente parámetros:
            ins = El arreglo de inspecciones del objeto de evaluacion actual
            handleOptionMenuClick = La funcion que obtendrá la inspeccion seleccionada en el menu
          En el componente CardInspection se pasan los siguientes parámetros:
            selectedInspection = Es la inspeccion seleccionada en el menu que fue obtenida con la funcion handleOptionMenuClick en el componente MenuInspection
            firstInspection = Manda la última inspeccion del arreglo de inspecciones, debido a que en la vista se muestran de forma descendente,
                              y por lo tanto se desea que la primera inspeccion esté activa
        */
        currentInspection ?
          (<Modal centered isOpen={isOpenM} toggle={toggleM}>
            <ModalHeader toggle={toggleM}>
              Inspecciones de {currentInspection.name} en el formulario {currentForm[0].name}
            </ModalHeader>
            <ModalBody>
              <div className='menu-inspection'><MenuInspection ins={currentInspection.inspection} handleOptionMenuClick={setOptionMenu}/></div>
              <div className='bloc-inspection'><CardInspection  selectedInspection={optionMenu} firstInspection={currentInspection.inspection[currentInspection.inspection.length-1]}/></div>
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
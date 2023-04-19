import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle} from 'reactstrap';
import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging} from '@fortawesome/free-solid-svg-icons';
import { getFieldValue, getFilledForm } from '../../Funciones/formInspection';
import '../../Estilos/modalInspection.css';
import PictureDialog from '../Vistas/PictureDialog';

const CardInspection = ({form, selectedInspection=null, firstInspection}) => {
  const [selectInspection, setSelectInspection] = useState();
  const [arrayInfo, setArrayInfo] = useState();
  let formato = null;

  const handleClickOpenPhoto = (name) => {
    this.setState({ image: name, showPictureDialog: true });
  };

  const handleClosePhoto = () => {
    this.setState({ showPictureDialog: false });
  };

  /*
    Este useEffect se utiliza para cambiar el estado de selectInspection cuando firstInspection o selectedInspection cambian
    designando la primera inspeccion si no hay una inspeccion seleccionada todavia
  */
  useEffect(() => {
    if (!selectedInspection) {
      setSelectInspection(firstInspection)
      if (firstInspection.inspectionFull.length > 0)
        formato = getFilledForm(firstInspection, form);
    } else {
      setSelectInspection(selectedInspection)
      if (selectedInspection.inspectionFull.length > 0)
        formato = getFilledForm(selectedInspection, form);
    }

    if (formato){
      let formu = {};
      let arraySection = [];
      formato.sections.forEach((section, index) => {
        section.fields.forEach(field => {
          let value = getFieldValue(field);

          if (Array.isArray(value)) 
            value = value.join(', ');
          
          if (typeof value === "boolean")
            value = (value) ? "Si" : "No";
    
          if (field.value && field.type === "imageFS")
            value = field.imageURI;

          if (value !== undefined && value !=='')
            formu = {
              ...formu,
              [field.options.webLabel]:{value: value, type: field.type, icon: field.icon}
            }
        });
        if (Object.keys(formu).length > 0) {
          arraySection.push({section:`s${index}`, name: section.name, value: formu})
          formu = {}
        }
      });
      setArrayInfo(arraySection)
    }
  }, [firstInspection, selectedInspection, form])

  function formatIconName(iconName) {
    //Si no existe el icono en la librería
    if (!iconName) {
      return 'mdiHelpCircle';
    }
  
    ///-(.)/g Busca cualquier guión seguido de cualquier carácter y captura ese carácter en un grupo, además de tomar en cuenta todas las coincidencias no solo la primera(global)
    const formattedName = iconName.replace(/-(.)/g, (match, group1) => group1.toUpperCase());

    //Concatena la palabra inicial con las coincidencias encontradas
    return `mdi${formattedName.charAt(0).toUpperCase()}${formattedName.slice(1)}`;
  }
  
  
  
  console.log(arrayInfo);
  return (
    <section>
      { 
        arrayInfo ? (
          arrayInfo.map((item, index) => (
            <section>
              <Card className="card-container" key={index}>
                <CardHeader>{item.name}</CardHeader>
                  <CardBody className='card-content'>
                    {
                      Object.keys(item.value).map((key) => (
                        <Card className='card-elemento' key={key}>
                          <section className='iconCard'>
                            <Icon path={mdi[formatIconName(item.value[key].icon)]} />
                          </section>
                          <section className='sub-Text'>
                            <CardSubtitle>{key}</CardSubtitle>
                            {
                              item.value[key].type === 'imageFS' ? (
                                <img
                                  style={{
                                  width: "100px",
                                  height: "100px",
                                  }}
                                  alt={key}
                                  src={item.value[key].value}
                                />
                              ) : (
                                <CardText>{item.value[key].value}</CardText>
                              )
                            }
                          </section>
                        </Card>
                      ))
                    }
                </CardBody>
              </Card>
            </section>
          ))
        ):(
            <section className='Message-InspectionFull'>
              <FontAwesomeIcon className='Message-InspectionFull-Icon' icon={faPersonDigging}></FontAwesomeIcon>
              <p>La inspección seleccionada está en progreso.</p>
              <p>Seleccione una inspección finalizada.</p>
            </section>
          )
      }
    </section>
  );
};

export default CardInspection;










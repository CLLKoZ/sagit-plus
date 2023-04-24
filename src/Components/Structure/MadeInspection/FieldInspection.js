import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle} from 'reactstrap';
import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonDigging} from '@fortawesome/free-solid-svg-icons';
import { getFieldValue, getFilledForm } from '../../../Functions/formInspection';

const CardInspection = ({form, selectedInspection=null, firstInspection, handlePropsImage, handleClickOpenImage}) => {
  const [arrayInfo, setArrayInfo] = useState(null);
  let formato = null;

  /* Ayda a pasar los parametros de la imagen cuando se le da clic y se indica la activación del modal para ver la imagen en grande*/
  const setShowImage= (nombre, root) => {
    handleClickOpenImage(true);
    handlePropsImage([nombre, root]);
  };

  /*
    Este useEffect se utiliza para cambiar el estado de selectInspection cuando firstInspection o selectedInspection cambian
    designando la primera inspeccion si no hay una inspeccion seleccionada todavia
  */
  useEffect(() => {
    if (!selectedInspection) {
      if (firstInspection.inspectionFull.length > 0)
        // eslint-disable-next-line react-hooks/exhaustive-deps
        formato = getFilledForm(firstInspection, form);
    } else {
      if (selectedInspection.inspectionFull.length > 0) {
        formato = getFilledForm(selectedInspection, form);
      } else {
        setArrayInfo(null)
      }
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

  /* Función para dar formato del nombre de iconos de acuerdo a Material UI*/
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

  return (
    /* Aqui se renderiza la información de lo que se llenó en la inspección*/
    <section>
      { 
        arrayInfo ? (
          arrayInfo.length > 0 ? (
          arrayInfo.map((item, index) => (
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
                              <img alt={key} src={item.value[key].value} onClick={() => {setShowImage(key, item.value[key].value)}}/>
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
          ))) : (
            <section className='Message-InspectionFull'>
              <FontAwesomeIcon className='Message-InspectionFull-Icon' icon={faPersonDigging}></FontAwesomeIcon>
              <p>No se ingresó información en la inspección</p>
            </section>
          )
        ):(
            <section className='Message-InspectionFull'>
              <FontAwesomeIcon className='Message-InspectionFull-Icon' icon={faPersonDigging}></FontAwesomeIcon>
              <p>La inspección seleccionada está en progreso</p>
              <p>Seleccione una inspección finalizada</p>
            </section>
          )
      }
    </section>
  );
};

export default CardInspection;
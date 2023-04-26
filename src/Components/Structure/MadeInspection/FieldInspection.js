import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle} from 'reactstrap';
import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
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
              <span className='Message-InspectionFull-Icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width={40} viewBox="0 0 576 512"><path d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V405.1l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"/></svg>
              </span>
              <p>No se ingresó información en la inspección</p>
            </section>
          )
        ):(
            <section className='Message-InspectionFull'>
              <span className='Message-InspectionFull-Icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width={40} viewBox="0 0 576 512"><path d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2H288c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7h32l22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V405.1l-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"/></svg>
              </span>
              <p>La inspección seleccionada está en progreso</p>
              <p>Seleccione una inspección finalizada</p>
            </section>
          )
      }
    </section>
  );
};

export default CardInspection;
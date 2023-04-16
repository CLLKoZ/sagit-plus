import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter,faCircleQuestion,faPersonDigging} from '@fortawesome/free-solid-svg-icons';
import { getFieldValue, getFilledForm } from '../../Funciones/formInspection';
import '../../Estilos/modalInspection.css';

const CardInspection = ({form, selectedInspection=null, firstInspection}) => {
  const [selectInspection, setSelectInspection] = useState();
  const [arrayInfo, setArrayInfo] = useState();
  let formato = null;
  /*
    Este useEffect se utiliza para cambiar el estado de selectInspection cuando firstInspection o selectedInspection cambian
    designando la primera inspeccion si no hay una inspeccin seleccionada todavia
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
            formu =  {
              ...formu,
              [field.options.webLabel]: value
            }
        });
        arraySection.push({section:`s${index}`, name: section.name, value: formu})
        formu = {}
      });
      setArrayInfo(arraySection)
    }
  }, [firstInspection, selectedInspection, form])

  
  
  console.log(arrayInfo);
  return (
    <section>
      { 
        arrayInfo ? (
          arrayInfo.map((item) => (
            <div>
              <Card className="card-container">
                <CardHeader>{item.name}</CardHeader>
                  <CardBody className='card-content'>
                    {
                      Object.keys(item.value).map((key, index) => (
                        <Card className='card-elemento'>
                          <div className='iconCard'>
                            <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                          </div> 
                          <div className='sub-Text'>
                            <CardSubtitle>{key}</CardSubtitle>
                            <CardText>{Object.values(item.value)[index]}</CardText>
                          </div>  
                        </Card>
                      ))
                    }
                </CardBody>
              </Card>
            </div>
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
/*
  {
    <Card className="card-container">
      <CardHeader>{section.sectionName}</CardHeader>
        <CardBody className='card-content'>
            {
              section.items.map((item) => (
                  item.fields === undefined ? (
                    <Card className='card-elemento'>
                      <div className='iconCard'>
                        <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
                      </div> 
                      <div className='sub-Text'>
                        <CardSubtitle>{item.primaryText}</CardSubtitle>
                        <CardText>{selectInspection._id}</CardText>
                      </div>  
                    </Card>
                  ):(
                      item.fields !== undefined ? (
                        <Card className='card-elemento'>
                          <div className='iconCard'>
                            <FontAwesomeIcon icon={faCircleQuestion}></FontAwesomeIcon>
                          </div> 
                          <div className='sub-Text'>
                            <CardSubtitle>{item.fields[0].options.webLabel}</CardSubtitle>
                            <CardText>{selectInspection._id}</CardText>
                          </div>
                        </Card>
                      ):('Algo salió mal')
                    )
              ))
            }
      </CardBody>
    </Card>
  }
*/
export default CardInspection;










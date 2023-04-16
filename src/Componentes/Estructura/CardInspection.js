import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardText, CardBody, CardSubtitle} from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import '../../Estilos/modalInspection.css';

const CardInspection = ({form, selectedInspection=null, firstInspection}) => {
  const [selectInspection, setSelectInspection] = useState();
  /*
    Este useEffect se utiliza para cambiar el estado de selectInspection cuando firstInspection o selectedInspection cambian
    designando la primera inspeccion si no hay una inspeccin seleccionada todavia
  */
  useEffect(() => {
    if (!selectedInspection) {
      setSelectInspection(firstInspection)
    } else {
      setSelectInspection(selectedInspection)
    }
  }, [firstInspection, selectedInspection])

  console.log(form);
  //console.log(selectInspection);
  return (
    <section>
      { 
      /*{section.items[item].fields[0].options.webLabel}*/
        form ? (
          form.map((section) => (
            <div>
              {
                selectInspection ? (
                  <Card className="card-container">
                    <CardHeader>{section.sectionName}</CardHeader>
                      <CardBody className='card-content'>
                          {
                            section.items.map((item) => (
                                item.fields === undefined ? (
                                  <Card className='card-elemento'>
                                    <CardSubtitle><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon> {item.primaryText}</CardSubtitle>
                                    <CardText>{selectInspection._id}</CardText>
                                  </Card>
                                ):(
                                    item.fields !== undefined ? (
                                      <Card className='card-elemento'>
                                        {console.log(item.fields)}
                                        <CardSubtitle><FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>{item.fields[0].options.webLabel}</CardSubtitle>
                                        <CardText></CardText>
                                      </Card>
                                    ):('Algo salió mal')
                                  )
                            ))
                          }
                    </CardBody>
                  </Card>
                ) : ('Seleccione una inspección')
              }
            </div>
          ))
        ):('Algo salió mal')
      }
    </section>
  );
};

export default CardInspection;










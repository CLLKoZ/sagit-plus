import { useMapEvents } from 'react-leaflet';
import { getObjectEvaluationByViewPort } from './ObjectEvaluation';
import { Icon } from 'leaflet';
import { getFieldValue, getFilledForm } from './formInspection';

/* Carga las coordenadas necesarios para obtener los objetos
de evaluacion por viewport al mover el mapa */
export function GetPolygon({estado, filtroMove}){
  const map = useMapEvents({
    moveend() {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      let coordenadas = [NorthEast, NorthWest, SouthWest, SouthEast]
      if (filtroMove)
      {
        getObjectEvaluationByViewPort(estado, coordenadas, filtroMove)
      } else {
        getObjectEvaluationByViewPort(estado, coordenadas)
      }
    }
  })
};

export const getIconMarker = (marker) =>{

  try{
    let icono = require(`../Images/Markers/${marker}-marker-base-blue.png`);
    const customIcon = new Icon({
      iconUrl: icono,
      iconSize: [25, 32]
    })
    return customIcon
  }catch {
    const customIcon = new Icon({
      iconUrl: require(`../Images/Markers/domain-marker-base-blue.png`),
      iconSize: [25, 32]
    })
    return customIcon
  }
};

const getLatestInspection = (objectEvaluation) => {
  if (objectEvaluation) {
    const latestInspection = objectEvaluation.inspection
    .filter((inspection) => inspection.inspectionFull.length > 0)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  return latestInspection;
  }
};

export const getCSV = (objectsEvaluation, formCSV) => {
  let forms = [];

  Object.values(objectsEvaluation).forEach(object => {
    const inspection = getLatestInspection(object);

    if (inspection === undefined) return;

    const filledForm = getFilledForm(inspection, formCSV);

    let form = {"Objeto de Evaluación": object.name};

    filledForm.sections.forEach(section => {
      section.fields.forEach(field => {
        let value = getFieldValue(field);

        if (Array.isArray(value)) 
          value = value.join(' - ');
        
        if (typeof value === "boolean")
          value = (value) ? "Si" : "No";

        if (field.value && field.type === "imageFS")
          value = field.imageURI;
        
        form =  {
          ...form,
          [field.options.webLabel]: value
        }
      });
    });

    forms = [...forms, form];
  });

  if(forms[0]){
    const header = Object.keys(forms[0]).join(';');
    const rows = forms.map(form => Object.values(form).join(';')).join('\n');

    const csvContent = "data:text/csv;charset=utf-8,%EF%BB%BF"
    + encodeURIComponent(header + '\n' + rows);

    return csvContent;
  } else return;
};
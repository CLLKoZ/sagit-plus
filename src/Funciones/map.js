import { useMapEvents } from 'react-leaflet';
import { getObjectEvaluationByViewPort } from './ObjectEvaluation';
import { Icon } from 'leaflet';

/* Carga las coordenadas necesarios para obtener los objetos
de evaluacion por viewport al mover el mapa */
export function GetPolygon({estado}){
  const map = useMapEvents({
    moveend() {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      getObjectEvaluationByViewPort(estado, NorthEast, NorthWest, SouthWest, SouthEast)
    }
  })
};

export const getIconMarker = (marker) =>{

  try{
    let icono = require(`../Imagenes/Marcadores/${marker}-marker-base-blue.png`);
    const customIcon = new Icon({
      iconUrl: icono,
      iconSize: [25, 32]
    })
    return customIcon
  }catch {
    const customIcon = new Icon({
      iconUrl: require(`../Imagenes/Marcadores/domain-marker-base-blue.png`),
      iconSize: [25, 32]
    })
    return customIcon
  }
};
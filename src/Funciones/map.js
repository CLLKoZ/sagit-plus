import { useMapEvents } from 'react-leaflet';
import { getObjectEvaluationByViewPort } from './ObjectEvaluation';

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
}
import { useMap, useMapEvents } from 'react-leaflet';
import { getObjectEvaluationByViewPort } from './ObjectEvaluation';

/* Cargaria las coordenadas necesarios para obtener los objetos
de evaluacion por viewport al iniciar el mapa */
export function GetInit(){
    const map = useMap()
    const NorthEast = map.getBounds().getNorthEast();
    const NorthWest = map.getBounds().getNorthWest();
    const SouthWest = map.getBounds().getSouthWest();
    const SouthEast = map.getBounds().getSouthEast();
    getObjectEvaluationByViewPort(NorthEast, NorthWest, SouthWest, SouthEast)
}

/* Cargaria las coordenadas necesarios para obtener los objetos
de evaluacion por viewport al mover el mapa */
export function GetPolygon(){
  const map = useMapEvents({
    moveend() {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      getObjectEvaluationByViewPort(NorthEast, NorthWest, SouthWest, SouthEast)
    }
  })
}
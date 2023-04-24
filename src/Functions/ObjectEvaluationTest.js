import { toast } from 'react-toastify';
import axios from '../API/Axios'
import { getCurrentUser } from './user';
import { debounce } from './utilidades';

let formInspection = null

const getObjectEvaluation = async (state) => {
  const headers = {
    Authorization: getCurrentUser().session.token
  };
  const body = {
    "filter": {isActive: true},
    "regex": [{name: 'name', value: ''}],
    "populate": ["typeObjectEvaluation"],
    "attributes": [],
    "pageNumber": 1,
    "limit": 50000
  }
  const peticion = await axios.post('/object-evaluation/find', 
  body, {headers}
  )

  const peticionReverse = () =>{
    return peticion.data.data.map(item=>{
      let peticionTemp = Object.assign({}, item);
      peticionTemp.address.location.coordinates = item.address.location.coordinates.reverse()
      return peticionTemp
    })
  }

  state(peticionReverse())
};

const setFormID = (id) =>{
  if(id === ""){
    formInspection = null
  } else {
    formInspection = id
  }
}

/* Aplica los filtros seleccionados en el panel
filtro al los objectos de evaluación */
const peticionFiltrada = (filtro, peticion) =>{
  let bandera = true
  let objectTemp = []
  peticionReverse(peticion).forEach(item=>{
    let inspectionTemp = []
    item.inspection.forEach(ins => {
      bandera = true
      if(ins.inspectionFull.length > 0) {
        filtro.forEach(fil => {
          if (fil.type === 'select' && bandera) {
            if (fil.value === ins.inspectionFull[0][`s${fil.section}`][fil.fieldName]) {
              bandera = true;
            } else {
              bandera = false;
            }
          } else if (fil.type === 'checkBox' && bandera) {
            if(ins.inspectionFull[0][`s${fil.section}`][fil.fieldName] === true) {
              bandera = true;
            } else {
              bandera = false;
            }
          } else if (fil.type === 'multiCheckFS' && bandera){
            bandera = false
            let valueLength = fil.value.length
            let isIncludeCounter = 0
            if (ins.inspectionFull[0][`s${fil.section}`][fil.fieldName]) {
              // Evalua si es un multicheck incluyente o excluyente
              if (fil.isExclude) {
                fil.value.forEach(val => {
                  let multiArray = ins.inspectionFull[0][`s${fil.section}`][fil.fieldName].includes(val)
                  if(multiArray)
                    isIncludeCounter++;
                })
                if (valueLength === isIncludeCounter)
                  bandera = true;
              } else {
                  fil.value.forEach(val => {
                    let multiArray = ins.inspectionFull[0][`s${fil.section}`][fil.fieldName].includes(val)
                    if(multiArray) {
                      bandera = true;
                    }
                  })
              }
            }
          }
        })
      }
      if (bandera && ins.inspectionFull.length > 0)
        inspectionTemp.push(ins)
    })
    if(inspectionTemp.length > 0){
      let objectEvaluation = {
        _id: item._id,
        name: item.name,
        address: item.address,
        contacts: item.contacts,
        eventHistory: item.eventHistory,
        inspection: inspectionTemp,
        isActive: item.isActive,
        projects: item.projects,
        type_object: item.type_object,
      }
      objectTemp.push(objectEvaluation);
    }
  })
  return objectTemp;
}

/* Revierte las coordenadas ya que leaflet usa la
latitud y longitud en diferente orden. */
const peticionReverse = (peticion) =>{
  return peticion.data.data.map(item=>{
    let peticionTemp = Object.assign({}, item);
    peticionTemp.address.location.coordinates = item.address.location.coordinates.reverse()
    return peticionTemp
  })
}

/* Cargar solo los Objetos de evaluación que se
encuentran en la pantalla en ese momento */
const getObjectEvaluationByViewPort = debounce(100, async (state, coor1, coor2, coor3, coor4, filtro) => {
  if (coor1){
    const headers = {
      Authorization: getCurrentUser().session.token,
      "Access-Control-Allow-Origin": "*"
      };
    const body = {
      "data": {
        "polygon": [
              [
                [coor1.lng, coor1.lat ],
                [coor2.lng, coor2.lat ],
                [coor3.lng, coor3.lat ],
                [coor4.lng, coor4.lat ],
                [coor1.lng, coor1.lat]
              ]
            ],
        "formInspection" : formInspection
      },
      "populate": [{"path": "group.supervisor", "select": ["lastName", "firstName"]}],
      "attributes": [],
      "pageNumber": 0,
      "limit": 0
      }
      try {
        const peticion = await axios.post('/object-evaluation/viewport', 
        body, {headers}
        )
        if(filtro) {
          state(peticionFiltrada(filtro, peticion))
        } else {
          state(peticionReverse(peticion))
        }
      } catch(error) {
        console.log(error.response.status)
        if(error?.response?.status === 401){
          window.localStorage.removeItem('loggedUser');
          window.location.reload()
          toast.info('La sesión a expirado', {
            position: "bottom-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
        }
      }
  }
});

const markerCounter = (objectEvaluation) => {
  let acumulator = 0;
  
  objectEvaluation.forEach(object => {
    if (object)
      acumulator = acumulator + 1;
  })

  if (acumulator > 0)
    return acumulator
  return 0;
}

export {
  getObjectEvaluation,
  getObjectEvaluationByViewPort, 
  setFormID, markerCounter
};
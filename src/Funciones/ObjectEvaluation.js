import axios from '../API/Axios'
import { getCurrentUser } from './funciones';
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
    const peticion = await axios.post('/object-evaluation/viewport', 
    body, {headers}
    )
    const peticionReverse = () =>{
      return peticion.data.data.map(item=>{
        let peticionTemp = Object.assign({}, item);
        peticionTemp.address.location.coordinates = item.address.location.coordinates.reverse()
        return peticionTemp
      })
    }
    let bandera = true

    if(filtro) {
      const peticionFiltrada = () =>{
        return peticionReverse().map(item=>{
          let inspectionTemp = []
          item.inspection.forEach((ins, index) => {
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
                  if (ins.inspectionFull[0][`s${fil.section}`][fil.fieldName]) {
                    let multiArray = ins.inspectionFull[0][`s${fil.section}`][fil.fieldName].find((multi) => {
                      return multi === fil.value
                    })
                    if(multiArray) {
                      bandera = true;
                    }
                  }
                }
              })
            }
            if (bandera && ins.inspectionFull.length > 0){
              inspectionTemp.push(ins)
            }
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
            return objectEvaluation
          } else {
            return undefined
          }
        })
      }
      state(peticionFiltrada())
    } else {
      state(peticionReverse())
    }
  }
});

export {
  getObjectEvaluation,
  getObjectEvaluationByViewPort, setFormID
};
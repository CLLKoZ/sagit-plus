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
  console.log(filtro)
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

    if(filtro) {
      console.log(peticionReverse())
      const peticionFiltrada = () =>{
        return peticionReverse().map(item=>{
          item.inspection.forEach((ins, index) => {
            let bandera = true
            if(ins.inspectionFull.length > 0) {
              filtro.forEach(fil => {
                // console.log(ins.inspectionFull[0][`s${fil.section}`][fil.fieldName])
                if (fil.type === 'select' && bandera) {
                  if (fil.value === ins.inspectionFull[0][`s${fil.section}`][fil.fieldName]) {
                    bandera = true;
                  } else {
                    bandera = false;
                  }
                }
              })
              if(bandera){
                let peticionTemp = Object.assign({}, item);
                console.log(peticionTemp.name)
              }
            }
          })
        })
      }
      peticionFiltrada()
    } else {
      state(peticionReverse())
    }
  }
});

export {
  getObjectEvaluation,
  getObjectEvaluationByViewPort, setFormID
};
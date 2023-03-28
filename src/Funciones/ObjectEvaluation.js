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

const setForm = (id) =>{
  if(id === ""){
    formInspection = null
  } else {
    formInspection = id
  }
}

const getObjectEvaluationByViewPort = debounce(100, async (state, coor1, coor2, coor3, coor4) => {

  if (coor1){
    const headers = {
      Authorization: getCurrentUser().accessToken,
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
      "populate": [],
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
    state(peticionReverse())
  }
});

export {
  getObjectEvaluation,
  getObjectEvaluationByViewPort, setForm
};
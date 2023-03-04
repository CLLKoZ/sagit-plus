import axios from '../API/Axios'
import { getCurrentUser } from './funciones';

const RUTA = '/object-evaluation/'

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

export {
  getObjectEvaluation
};
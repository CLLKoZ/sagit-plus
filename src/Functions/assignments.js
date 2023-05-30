import { toast } from "react-toastify";
import Axios from "../API/Axios"
import { getCurrentUser, logOutNoHook } from "./user"
import { icon } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { debounce } from "./utilidades";

let posibleStatus = {
  not: 'Sin iniciar',
  complete: 'Completada',
  init: 'Iniciada'
}

const getAssignments = async (setAssignment) => {
  const headers = {
    Authorization: getCurrentUser().session.token,
    "Access-Control-Allow-Origin": "*"
  };
  const body = {
    "filter": {isActive: true},
    "regex": [],
    "populate": ["objectEvaluate", "formInspection"],
    "attributes": [],
    "pageNumber": 1,
    "limit": 50000
  }
  try {
    const response = await Axios.post('/assignment/find', body, {headers})

    setAssignment(peticionReverse(response.data.data))
  } catch (error) {
    if (error?.response?.status === 401) {
      setTimeout(() => {
        logOutNoHook();
      }, 2000)
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
    } else {
      console.error(error.response);
    }
  }
}

const getAssignmentsByViewPort = debounce(100, async (setAssignment, coor, projectID, formID) => {
  if (coor){
    const headers = {
      Authorization: getCurrentUser().session.token,
      "Access-Control-Allow-Origin": "*"
    };
    const body = {
      "data": {
        "polygon": [
            [
              [coor[0].lng, coor[0].lat],
              [coor[1].lng, coor[1].lat],
              [coor[2].lng, coor[2].lat],
              [coor[3].lng, coor[3].lat],
              [coor[0].lng, coor[0].lat]
            ]
        ],
        "formInspection": formID,
        "project": projectID,
      },
      "filter": {isActive: true},
      "regex": [],
      "populate": [],
      "attributes": [],
      "pageNumber": 1,
      "limit": 50000
    }
    try {
      const response = await Axios.post('/object-evaluation/assignments', body, {headers})
      setAssignment(peticionReverse(response.data.data.assignments))
    } catch (error) {
      if (error?.response?.status === 401) {
        setTimeout(() => {
          logOutNoHook();
        }, 2000)
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
      } else {
        console.error(error.response);
      }
    }
  }
});

const peticionReverse = (response) =>{
  return response.map(item=>{
    let peticionTemp = Object.assign({}, item);
    if(!peticionTemp.status)
      peticionTemp['status'] = posibleStatus.not
    peticionTemp['icono'] = iconByStatus(peticionTemp.status)
    peticionTemp.objectEvaluate.address.location.coordinates = item.objectEvaluate.address.location.coordinates.reverse()
    return peticionTemp
  })
};

const iconByStatus = (status) => {
  if (status === posibleStatus.not) {
    return icon({
      iconUrl: require(`../Images/Markers/domain-marker-base-blue.png`),
      iconSize: [25, 32]
    })
  } else if (status === posibleStatus.init) {
    return icon({
      iconUrl: require(`../Images/Markers/domain-marker-base-orange.png`),
      iconSize: [25, 32]
    })
  } else {
    return icon({
      iconUrl: require(`../Images/Markers/domain-marker-base-green.png`),
      iconSize: [25, 32]
    })
  }
};

const AssignmentMove = ({setAssignment, projectID, formID}) => {
  const map = useMapEvent({
    moveend() {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      let coordenadas = [NorthEast, NorthWest, SouthWest, SouthEast]
      if (formID) {
        getAssignmentsByViewPort(setAssignment, coordenadas, projectID, formID)
      }
    }
  })
};

const createAssignment = (assign) => {
  const headers = {
    Authorization: getCurrentUser().session.token,
    "Access-Control-Allow-Origin": "*"
  }

  const body = {
    data:{
      objectEvaluate: assign.objectEvaluate._id,
      formInspection: "5f4c2c00a61d3b0fa354e958",
      supervisor:"5f4b390d1e09cc0923b261e6",
      createdBy: "5f4b390d1e09cc0923b261e6",
      dateOfInspection: "2021-07-08T22:11:18.716+00:00",
      project: "5f4b33061e09cc0923b261df"
    }
  }
};

export {
  getAssignments, getAssignmentsByViewPort,
  AssignmentMove
}
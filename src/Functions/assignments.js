import Axios from "../API/Axios"
import { getCurrentUser, logOutNoHook } from "./user"
import { icon } from "leaflet";
import { useMapEvent } from "react-leaflet";
import { debounce } from "./utilidades";
import { expiredSession, genericError, internalServerError } from "./notifications";

let posibleStatus = {
  not: 'Sin iniciar',
  complete: 'Completada',
  init: 'Iniciada'
}

const getAssignmentsByViewPort = debounce(100, async (setObjects, coor, projectID, formID) => {
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
        "project": projectID
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
      peticionReverse(response.data.data.objects)
      setObjects(checkObjectAssign(response.data.data.objects, response.data.data.assignments))
    } catch (error) {
      if (error?.response?.status === 401) {
        setTimeout(() => {
          logOutNoHook();
        }, 2000)
        expiredSession();
      } else {
        console.error(error.response);
      }
    }
  }
});

const checkObjectAssign = (objects, assignments) =>{
  return objects.map(object => {
    let objectTemp = Object.assign({}, object);
    let objectAssign = [];
    assignments.forEach(assign => {
      if (object._id === assign.objectEvaluate._id){
        objectAssign.push(assign);
        if (assign.status === posibleStatus.complete) {
          objectTemp['icono'] = iconByStatus(assign.status);
          objectTemp['status'] = assign.status;
        }
        else if(assign.status === posibleStatus.not){
          objectTemp['icono'] = iconByStatus(posibleStatus.init);
          objectTemp['status'] = posibleStatus.not;
        } else {
          objectTemp['icono'] = iconByStatus(posibleStatus.init);
          objectTemp['status'] = posibleStatus.init;
        }
      }
    })
    objectTemp['assignments'] = objectAssign;
    return objectTemp
  })
};

const peticionReverse = (response) =>{
  return response.map(item=>{
    let peticionTemp = Object.assign({}, item);
    peticionTemp.address.location.coordinates = item.address.location.coordinates.reverse()
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

const AssignmentMove = ({setAssignment, projectID, formID=null, setCoor}) => {
  const map = useMapEvent({
    moveend() {
      const NorthEast = map.getBounds().getNorthEast();
      const NorthWest = map.getBounds().getNorthWest();
      const SouthWest = map.getBounds().getSouthWest();
      const SouthEast = map.getBounds().getSouthEast();
      let coordenadas = [NorthEast, NorthWest, SouthWest, SouthEast]
      setCoor(coordenadas)
      if (formID && projectID) {
        getAssignmentsByViewPort(setAssignment, coordenadas, projectID, formID)
      } else if (projectID) {
        getAssignmentsByForm(setAssignment, coordenadas, projectID)
      }
    }
  })
};

const createAssign = (idProject, form, supervisor, objects) =>{
  if(idProject && form && supervisor && objects){
    const headers = {
      Authorization: getCurrentUser().session.token,
      "Content-Type": "application/json"
    }
    
    objects.forEach(async object => {
      const body = {
        "data":{
          "project": idProject,
          "formInspection": form,
          "supervisor": supervisor,
          "objectEvaluate": [object._id]
        }
      }

      try {
        const response = await Axios.post('/assignment', body, {headers});
        return response.data;
      } catch (error){
        if(error?.response?.status === 500) {
          internalServerError();
        } else if (error?.response?.status === 401) {
          expiredSession();
        } else {
          genericError();
        }
      }
    })
  }
}
const updateAssign =  async (idAssignment, idUser) => {
  if(idAssignment){
    const headers = {
      Authorization: getCurrentUser().session.token,
      "Content-Type": "application/json"
    }
    const body = {
      "data":{
        "supervisor": idUser
      }
    }
    try {
      await Axios.put(`/assignment/${idAssignment}`, body, {headers});
    } catch (error){
      if(error?.response?.status === 500) {
        internalServerError();
      } else if (error?.response?.status === 401) {
        expiredSession();
      } else {
        genericError();
      }
    }
  }
}
const deleteAssign =  async (idAssignment) => {
  if(idAssignment){
    const headers = {
      Authorization: getCurrentUser().session.token,
      "Content-Type": "application/json"
    }
    try {
      await Axios.delete(`/assignment/${idAssignment}`, {headers});
    } catch (error){
      if(error?.response?.status === 500) {
        internalServerError();
      } else if (error?.response?.status === 401) {
        expiredSession();
      } else {
        genericError();
      }
    }
  }
}
const findAssignment = async (idObject, idForm, idProject, setAssignment) => {
  const headers = {
    Authorization: getCurrentUser().session.token
  };
  const body = {
    "filter": {
      "objectEvaluate": idObject,
      "formInspection": idForm,
      "project": idProject,
    },
    "regex": [],
    "populate": [{"path": "supervisor", "select": ["lastName", "firstName"]}],
    "attributes": []
  }
  try {
    const response = await Axios.post('/assignment/find', body, {headers})
    setAssignment(response.data.data)
  } catch (error) {
    if (error?.response?.status === 401) {
      setTimeout(() => {
        logOutNoHook();
      }, 2000)
      expiredSession();
    } else {
      console.error(error.response);
    }
  }
}

const getAssignmentsByForm = debounce(100, async (setObjects, coor, projectID, forms) => {
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
        "project": projectID
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
      peticionReverse(response.data.data.objects)
      console.log(availableForm(response.data.data.objects, response.data.data.assignments, forms))
      setObjects(availableForm(response.data.data.objects, response.data.data.assignments, forms))
    } catch (error) {
      if (error?.response?.status === 401) {
        setTimeout(() => {
          logOutNoHook();
        }, 2000)
        expiredSession();
      } else {
        console.error(error.response);
      }
    }
  }
});

const availableForm = (objects, assignments, forms) =>{
  return objects.map(object => {
    let objectTemp = Object.assign({}, object);
    let objectAssign = [];
    assignments.forEach(assign => {
      if (object._id === assign.objectEvaluate._id){
        objectAssign.push(assign);
      }
    })
    objectTemp['icono'] = assignmentColorByForm(objectAssign, forms);
    objectTemp['assignments'] = objectAssign;
    return objectTemp
  })
}

const assignmentColorByForm = (objectAssign, forms=[], form=[]) => {
  let acumulador = 0;
  let acumComplete = 0;
  if (objectAssign.length > 0){
    objectAssign.forEach(objAssign => {
      acumulador++;
      if (objAssign.status === 'Completado') {
        acumComplete++;
      }
    })
    if (acumulador === forms.length) {
      if (acumComplete === forms.length) {
        return icon({
          iconUrl: require(`../Images/Markers/domain-marker-base-blue.png`),
          iconSize: [25, 32]
        })
      } else {
        return icon({
          iconUrl: require(`../Images/Markers/domain-marker-base-purple.png`),
          iconSize: [25, 32]
        })
      }
    } else {
      return icon({
        iconUrl: require(`../Images/Markers/domain-marker-base-cyan.png`),
        iconSize: [25, 32]
      })
    }
  } else {
    return icon({
      iconUrl: require(`../Images/Markers/domain-marker-base-grey.png`),
      iconSize: [25, 32]
    })
  }
}

export {
  getAssignmentsByViewPort, AssignmentMove, createAssign, updateAssign, 
  deleteAssign, findAssignment, getAssignmentsByForm, availableForm
}
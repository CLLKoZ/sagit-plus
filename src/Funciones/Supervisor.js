import React, { useEffect, useState } from 'react';
import Axios from '../API/Axios';
import {getCurrentUser} from './funciones';
const Supervisor = ({inspectionID}) => {
  const [supervisor, setSupervisor] = useState(null);

  /* Este useEffect se utiliza para hacer una peticion del nombre y apellido del supervisor deacuerdo al id de la inspeccion seleccionada denominada inspectionID */
  useEffect(()=>{
    const getSupervisor = async() => {
      const headers={
        Authorization: getCurrentUser().session.token
      }
      const body={
        "filter": {"_id": inspectionID},
        "regex": [],
        "populate": [{"path": "group.supervisor", "select": ["lastName", "firstName"]}],
        "attributes": [],
        "pageNumber": 1,
        "limit": 5
      }
      try {
        const response = await Axios.post('/inspection/find', body, {headers});
        setSupervisor(response.data.data);
      } catch (error) {
        
      }
    }
    getSupervisor();
  }, [inspectionID])

  /* Esta función da el formato para presentar el nombre del supervisor de la inspeccion */
  function formatSupervisor(supervisor){
    return supervisor.firstName + ' ' + supervisor.lastName; 
  }
  /*
    Aqui se renderiza el nombre del supervisor de la inspeccion seleccionada
  */
  return (<>{supervisor ? (formatSupervisor(supervisor[0].group.supervisor)):('Sin Asignar')}</>);

}

export default Supervisor;
import React, { useEffect, useState } from 'react';
import Axios from '../API/Axios';
import {getCurrentUser} from './funciones';
const Supervisor = ({inspectionID}) => {
  const [supervisor, setSupervisor] = useState(null);


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

  function formatSupervisor(supervisor){
    return supervisor.firstName + ' ' + supervisor.lastName; 
  }
  console.log(inspectionID);

  console.log(supervisor);
  return (<>{supervisor ? (formatSupervisor(supervisor[0].group.supervisor)):('No hay')}</>);

}

export default Supervisor;
import React, { useEffect, useState } from 'react';
import { addEventListeners, removeEventListeners } from '../Proveedores/Window';
import TimeoutWarningModal from './TimeoutWarningModal';

const TimeOut = () => {

  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () => setTimeout(()=>{ 
      setWarningModalOpen(true);
      console.log("Pasaron 5 segundos");
      let utcSeconds = 1679955287;
      let d = new Date(0);
      let d2 = new Date();
      d.setUTCSeconds(utcSeconds);

      const fecha = new Date("2020-11-20T18:36:30.143Z")
      console.log(fecha.toLocaleDateString())
      console.log(fecha.toLocaleTimeString())
    }, 10000)

    const createTimeout2 = () => setTimeout(() => {
      // Implement a sign out function here
      window.localStorage.removeItem('loggedUser');
      window.location.assign('/login');
    }, 10000000)

    const listener = () => {
      if(isWarningModalOpen){
        clearTimeout(timeout);
        timeout = createTimeout2();
      }
    } 

    // Initialization
    let timeout = isWarningModalOpen  ? createTimeout2() : createTimeout1();
    addEventListeners(listener);

    window.addEventListener('beforeunload', function () {
      window.localStorage.removeItem('loggedUser');
      window.location.assign('/login');
    })

    // Cleanup
    return () => {
      removeEventListeners(listener);
      clearTimeout(timeout);
    }
  },[isWarningModalOpen])
  return (
    <div>
      {isWarningModalOpen && (
        <TimeoutWarningModal
          isOpen={isWarningModalOpen}
          onRequestClose={() => setWarningModalOpen(false)}
        />
        )
      }
    </div>
  );
}

export default TimeOut;

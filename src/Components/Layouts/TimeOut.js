import React, { useEffect, useState } from 'react';
import { addEventListeners, removeEventListeners } from '../Providers/EventListeners';
import TimeoutWarningModal from './TimeoutWarningModal';

const TimeOut = () => {

  const [isWarningModalOpen, setWarningModalOpen] = useState(false);
  useEffect(() => {
    const createTimeout1 = () => setTimeout(()=>{ 
      setWarningModalOpen(true);
    }, 1.2e+6)

    const createTimeout2 = () => setTimeout(() => {
      // Implement a sign out function here
      window.localStorage.removeItem('loggedUser');
      window.location.assign('/login')
    }, 60000)

    const listener = () => {
      if(!isWarningModalOpen){
        clearTimeout(timeout)
        timeout = createTimeout1();
      }
    } 

    // Initialization
    let timeout = isWarningModalOpen  ? createTimeout2() : createTimeout1()
    addEventListeners(listener);

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

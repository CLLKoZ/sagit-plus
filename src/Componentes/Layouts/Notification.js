import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWarning, faClose } from '@fortawesome/free-solid-svg-icons';

import '../../Estilos/notificacion.css'
import { useEffect, useState } from 'react';
import { keyframes } from 'styled-components';

const Notification = ({texto, click=false}) => {
  const [isCalled, setIsCalled] = useState(false);
  const [estilo, setEstilo] = useState({display: 'none'});
  const show_slide = keyframes`
  0% {
    transform: translateX(100%);
  }
  40% {
    transform: translateX(-10%);
  }
  80% {
      transform: translateX(0%);
  }
  100% {
      transform: translateX(-10px);
  }
  `;

  const hide_slide = keyframes`
  0% {
    transform: translateX(-10px);
  }
  40% {
      transform: translateX(0%);
  }
  80% {
      transform: translateX(-10%);
  }
  100% {
      transform: translateX(100%);
  }
  `

  useEffect(() => {
    const activateClass = () => {
      const custom = {animation: 'show_slide 1s ease forwards'}
      setEstilo(custom);
    }
    if (click){
      activateClass();
    }
  }, [click])

  useEffect(() => {
    const desactivateClass = () => setTimeout(()=>{ 
      setIsCalled(false)
    }, 3000)

    desactivateClass();
  }, [isCalled])

  return (
    <section>
      <div style={estilo} className='alerta'>
        <span className='fas alerta-icon'>
          <FontAwesomeIcon icon={faWarning} />
        </span>
        <span className='msg'>Aun no ha seleccionado ningun filtro</span>
        <div className='btn-cerrar'>
        <span onClick={(() => setIsCalled(false))} className='fas close-icon'>
          <FontAwesomeIcon icon={faClose} />
        </span>
        </div>
      </div>
    </section>
  );
}

export default Notification;

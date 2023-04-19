import React, { useEffect } from 'react';
import '../../Estilos/notFound.css'
import Header from '../Estructura/Header';
import { NavLink } from 'react-router-dom';
import Icon from '@mdi/react';
import { mdiGhost } from '@mdi/js';

const NotFound = () => {

  useEffect(() => {
    document.title = "SAGIT | 404 Not Found"
  }, [])

  return (
    <section>
      <div>
        <Header />
      </div>
      <div className='contenido-found'>
        <p className='title-found'><Icon path={mdiGhost} size={1.5} /> Error 404 <Icon path={mdiGhost} size={1.5} /></p>
        <p className='texto-found'>La pagina que está intentando visitar no tiene ningún contenido</p>
        <div className='link-container'>
          <NavLink className={'link-found'} to='/mapa' >Regresar al mapa</NavLink>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

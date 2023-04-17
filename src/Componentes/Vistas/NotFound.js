import React from 'react';
import '../../Estilos/notFound.css'
import Header from '../Estructura/Header';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkSlash } from '@fortawesome/free-solid-svg-icons';

const NotFound = () => {
  return (
    <section>
      <div>
        <Header />
      </div>
      <div className='contenido-found'>
        <p className='title-found'>Error 404 <FontAwesomeIcon icon={faLinkSlash}/></p>
        <p className='texto-found'>La pagina que está intentando visitar no tiene ningun contenido</p>
        <div className='link-container'>
          <NavLink className={'link-found'} to='/mapa' >Regresar al mapa</NavLink>
        </div>
      </div>
    </section>
  );
}

export default NotFound;

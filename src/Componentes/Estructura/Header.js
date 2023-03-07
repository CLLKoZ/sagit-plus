import React from 'react';
import '../../Estilos/header.css'
import { logOut } from '../../Funciones/funciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';

const Header = ({isLogged}) => {

  return(
    <section>
      <header className={isLogged ? 'background' : ''}>
        <a className='logo' href='/'>SAGIT</a>
        <nav className='navigation'>
          {
            isLogged 
            ? <div>
                <label for='btnFiltro' class="filtro" type="button">Filtros</label>
                <label type="button" className='btnLogin-popup'>
                  <p className='expand' onClick={logOut} >Cerrar Sesión</p>
                </label>
              </div>
            : <div></div>
          }
        </nav>
      </header>
      <input type="checkbox" id="btnFiltro"/>
      <div className='container-filtro'>
        <div className='cont-filtro'>
          <nav>
            <form>
              <label>Prueba 1</label>
              <input type="text"></input>
              <label>Prueba 2</label>
              <input type="text"></input>
              <label>Prueba 3</label>
              <input type="text"></input>
              <label>Prueba 4</label>
              <input type="text"></input>
              <button type='submit'>Filtrar</button>
            </form>
          </nav>
          <label for='btnFiltro' className='closeFiltro'>C</label>
        </div>
      </div>
    </section>
      
  );
};

export default Header;
import React, {useEffect,useState} from 'react';
import '../../Estilos/header.css'
import { logOut } from '../../Funciones/funciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faFilter,faRightFromBracket, faFile } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../../Funciones/funciones';
import {Dropdown,DropdownItem,DropdownMenu,DropdownToggle} from 'reactstrap';
import TimeOut from './TimeOut';

/* Estructura de Header ocupada en todas las pantallas que lo neceten */
const Header = () => {
  /* Se crea un estado local, que permite controlar los estados de los Dropdowns*/
  const [dropdownOpenReport, setDropdownOpenReport] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);
  /* Esta funcion se encarga de cambiar el estado de los dropdowns*/
  const toggleDropdownReport = () => setDropdownOpenReport(!dropdownOpenReport);
  const toggleDropdownUser = () => setDropdownOpenUser(!dropdownOpenUser);
  /*Se crea un estado local, que permite controlar los estados de la aparicion de reportes y filtros solo en el mapa*/
  const [hideElement, setHideElement] = useState(false);
/*Esta funcion cambia el estado para la aparicion de reportes y filtros solo en el mapa*/
  useEffect(() => {
    if (window.location.pathname === '/mapa') {
      setHideElement(false);
    } else {
      setHideElement(true);
    }
  }, []);
  
  return(
    <section>
      <TimeOut />
      <header className={'background'}>
        <NavLink to='/' className='logo'>SAGIT</NavLink>
        <nav className='navigation'>
          <div>
            {
              !hideElement &&
              <label htmlFor='btnFiltro' className="filtro" type="button">
              <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon>
              &nbsp;Filtros
            </label>
            }
            {
              !hideElement &&
              <label>
                <Dropdown isOpen={dropdownOpenReport} toggle={toggleDropdownReport}>
                  <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenReport ? "transparent" : "transparent" }}>
                    <FontAwesomeIcon icon={faFile}></FontAwesomeIcon>
                    &nbsp;Reportes
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>CSV</DropdownItem>
                    <DropdownItem>PDF</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </label>
            }
            <label type="button">
              <Dropdown isOpen={dropdownOpenUser} toggle={toggleDropdownUser}>
                <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenUser ? "transparent" : "transparent" }}>
                    <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
                    &nbsp;{getCurrentUser().user}
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem onClick={logOut}>
                    <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                    &nbsp;Cerrar Sesión
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </label>   
          </div>
        </nav>
      </header>
    </section>     
  );
};

export default Header;
import React, {useEffect,useState} from 'react';
import '../../Estilos/header.css'
import { logOut } from '../../Funciones/funciones';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faFilter,faRightFromBracket, faFile, faLocationDot} from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../../Funciones/funciones';
import {Dropdown, DropdownItem, DropdownMenu, DropdownToggle} from 'reactstrap';
import { getCSV } from '../../Funciones/map';
import { printCSV } from '../../Funciones/utilidades';

/* Estructura de Header ocupada en todas las pantallas que lo neceten */
const Header = ({evaluationHeader=null, form=null, counter=null}) => {
  /* Se crea un estado local, que permite controlar los estados 
  de los Dropdowns*/
  const [dropdownOpenReport, setDropdownOpenReport] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  /* Esta funcion se encarga de cambiar el estado de los dropdowns*/
  const toggleDropdownReport = () => setDropdownOpenReport(!dropdownOpenReport);
  const toggleDropdownUser = () => setDropdownOpenUser(!dropdownOpenUser);

  /*Se crea un estado local, que permite controlar los estados de 
  la aparicion de reportes y filtros solo en el mapa*/
  const [hideElement, setHideElement] = useState(true);

  const [objectEvaluation, setObjectEvaluation] = useState(null);

  useEffect(() => {
    if (form)
      setObjectEvaluation(evaluationHeader);
  }, [evaluationHeader, form])

  /*Esta funcion cambia el estado para la aparicion de reportes y 
  filtros solo en el mapa*/
  useEffect(() => {
    if (window.location.pathname === '/mapa') {
      setHideElement(false);
    } else {
      setHideElement(true);
    }
  }, []);

  const downloadCSV = (evaluation) =>{
    if (form) {
      const CSV = getCSV(evaluation, form);
      printCSV(CSV);
    }
  }
  
  return(
    <section>
      <header className='background'>
        <section className='cabecera-Nav'>
          <NavLink to='/mapa' className='logo'>SAGIT</NavLink>
          {
            !hideElement &&
            <label className="marcadores">
              <FontAwesomeIcon className='header-icon' icon={faLocationDot} />
              Marcadores: {counter}
            </label>
          }
        </section>
        <nav className='navigation'>
          {
            !hideElement &&
            <label htmlFor='btnFiltro' className="filtro">
              <FontAwesomeIcon className='header-icon' icon={faFilter} />
              Filtros
            </label>
          }
          {
            !hideElement &&
            <label>
              <Dropdown isOpen={dropdownOpenReport} toggle={toggleDropdownReport}>
                <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenReport ? "transparent" : "transparent" }}>
                  <FontAwesomeIcon className='header-icon' icon={faFile} />
                  Reportes
                </DropdownToggle>
                <DropdownMenu style={{zIndex: 1002}}>
                  <DropdownItem onClick={()=>{downloadCSV(objectEvaluation)}}>CSV</DropdownItem>
                  <DropdownItem>PDF</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </label>
          }
          <label>
            <Dropdown isOpen={dropdownOpenUser} toggle={toggleDropdownUser}>
              <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenUser ? "transparent" : "transparent" }}>
                  <FontAwesomeIcon className='header-icon' icon={faUserCircle} />
                  {getCurrentUser().session.username}
              </DropdownToggle>
              <DropdownMenu style={{zIndex: 1002}}>
                <DropdownItem onClick={logOut}>
                  <FontAwesomeIcon icon={faRightFromBracket} />
                  &nbsp;Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </label>   
        </nav>
      </header>
    </section>     
  );
};

export default Header;
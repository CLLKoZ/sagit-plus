import React, {useEffect,useState} from 'react';
import Icon from '@mdi/react';
import '../../Styles/header.css'
import { toast } from 'react-toastify';
import TimeOut from '../Layouts/TimeOut';
import { NavLink, useNavigate } from 'react-router-dom';
import { addTools, getCSV, getCurrentUser, logOut, printCSV } from '../../Functions';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { mdiAccountCircle, mdiFileDocument, mdiFilterMultiple, mdiLogout, mdiMapMarkerMultiple, mdiMicrosoftExcel } from '@mdi/js';
import { objectRoutes } from './ObjectRoutesHeader';

/* Estructura de Header ocupada en todas las pantallas que lo neceten */
const Header = ({evaluationHeader=null, form=null, counter=null}) => {
  /* Se crea un estado local, que permite controlar los estados 
  de los Dropdowns*/
  const [dropdownOpenReport, setDropdownOpenReport] = useState(false);
  const [dropdownOpenUser, setDropdownOpenUser] = useState(false);

  const navigate = useNavigate();

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
    addTools(setHideElement)
  }, []);

  const downloadCSV = (evaluation) =>{
    if (form) {
      const CSV = getCSV(evaluation, form);
      printCSV(CSV);
    } else {
      toast.warning('Seleccione un filtro para generar un reporte', {
        position: "bottom-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        style: {background: '#0f1f52'}
      });
    }
  }
  
  return(
    <section>
      <TimeOut></TimeOut>
      <header className='background'>
        <section className='cabecera-Nav'>
          <NavLink to='/mapa' className='logo'><strong>SAGIT</strong></NavLink>
          {
            !hideElement &&
            <label className="marcadores">
              <Icon path={mdiMapMarkerMultiple} size={1} />
              &nbsp;Marcadores: {counter}
            </label>
          }
        </section>
        <nav className='navigation'>
          {
            !hideElement &&
            <label htmlFor='btnFiltro' className="filtro">
              <Icon path={mdiFilterMultiple} size={1} />
              &nbsp;Filtros
            </label>
          }
          {
            !hideElement &&
            <label>
              <Dropdown isOpen={dropdownOpenReport} toggle={toggleDropdownReport}>
                <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenReport ? "transparent" : "transparent" }}>
                <Icon path={mdiFileDocument} size={1} />
                  &nbsp;Reportes
                </DropdownToggle>
                <DropdownMenu style={{zIndex: 1002}}>
                  <DropdownItem onClick={()=>{downloadCSV(objectEvaluation)}}><Icon path={mdiMicrosoftExcel} size={1} /> CSV</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </label>
          }
          <label>
            <Dropdown isOpen={dropdownOpenUser} toggle={toggleDropdownUser}>
              <DropdownToggle className="menuDrop" caret  style={{ backgroundColor: dropdownOpenUser ? "transparent" : "transparent" }}>
              <Icon path={mdiAccountCircle} size={1} />
                  &nbsp;{getCurrentUser().session.username}
              </DropdownToggle>
              <DropdownMenu style={{zIndex: 1002}}>
                <DropdownItem header>Herramientas</DropdownItem>
                {
                  objectRoutes.map((object, index) => 
                    <DropdownItem key={index}>
                      <NavLink to={object.route} className={'nav-link'}>
                        <Icon path={object.icon} size={1} />
                        &nbsp;{object.name}
                      </NavLink>
                    </DropdownItem>
                  )
                }
                <DropdownItem header>Opciones de usuario</DropdownItem>
                <DropdownItem onClick={()=>logOut(navigate)}>
                  <Icon path={mdiLogout} size={1} />
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
import React, {useState, useEffect} from 'react';
import '../../Estilos/panelFiltroMapa.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import {getCurrentUser} from '../../Funciones/funciones'
import { setForm } from '../../Funciones/ObjectEvaluation';

class PanelFiltro extends React.Component{

  constructor(props){
    super(props);
    this.select = React.createRef();
    this.textInput = React.createRef();
    this.state = {seleccion : undefined}
  }

  focusTextInput() {
    this.textInput.current.focus();
  }

  render(){
    return(
      /* Estructura de Filtro para datos en el mapa */
      <section>
        <input type="checkbox" id="btnFiltro"/>
        <div className='container-filtro'>
          <div className='cont-filtro'>
            <div>
              <form>
                <label className='labelFiltro'>Prueba 1</label>
                <input className='inputFiltro' type="text"></input>
                <label className='labelFiltro'>Prueba 2</label>
                <input className='inputFiltro' ref={this.textInput} onChange={(e)=>this.setState({seleccion: e.target.value})} type="text"></input>
                <label className='labelFiltro'>Prueba 3</label>
                <select className='selectFiltro'>
                  <option value="Vacio u.u" key="" >Seleccione una opción</option>
                  <option value="Estoy seleccionado">Seleccioname</option>
                </select>
                <label className='labelFiltro'>Prueba 4</label>
                <input className='inputFiltro' type="text"></input>
                <div className='contenedorBoton'>
                  <button className="btnFiltrar" type='submit'>Filtrar</button>
                </div>
              </form>
            </div>
            <label htmlFor='btnFiltro' className='closeFiltro'><FontAwesomeIcon icon={faCircleXmark}></FontAwesomeIcon></label>
          </div>
        </div>
      </section>
    );
  }
};

export default PanelFiltro;
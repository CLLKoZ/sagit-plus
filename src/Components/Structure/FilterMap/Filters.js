import React, { useEffect, useState } from 'react';
import '../../../Styles/filtro.css';
import './style.css';
import 'bootstrap/dist/css/bootstrap.css'
import { isExclude, saveFilterCheck, saveFilterMultiCheck, saveFilterSelect } from '../../../Functions';
import Select from 'react-select';

const Filtros = ({formFiltro, setFilter}) => {

  const [itemsFilter, setItemsFilter] = useState([]);
  const [exclude, setExclude] = useState([]);
  
  useEffect(() => {
    if (itemsFilter) {
      if (itemsFilter.length === 0) {
        setItemsFilter(null)
      } else {
        setFilter(itemsFilter)
      }
    } else {
      setFilter(itemsFilter)
    }
  }, [itemsFilter, setFilter])

  useEffect(() => {
    setItemsFilter(null)
    setExclude(null)
  }, [formFiltro])

  useEffect(() => {
    if (exclude)
      if(exclude.length === 0)
        setExclude(null)
  }, [exclude])

  return (
    <>
      {
        formFiltro && (
          <div className='contenedor-filtro'>
            { formFiltro.sections.map((section, index) => (
              section.items.map((item)=> (
                item.fields && (
                  item.fields.map((field)=> (
                    field.isFilter && (
                      field.isFilter === true && (
                        field.type === 'select' ? (
                          <div key={field.name}>
                            <label className='label-filtro'>{field.options.webLabel}</label>
                            <select 
                              className='selectPanel' 
                              onChange={
                                (e) => saveFilterSelect(e.target.value, field.name, index, field.type, itemsFilter, setItemsFilter)
                              }>
                              <option value="">Seleccione una opción</option>
                              {field.options.items.map(opItem => (
                                <option value={opItem.value} key={opItem.value}>
                                  {opItem.label}
                                </option>
                              ))}
                            </select>
                          </div>
                        ) :
                        field.type === 'checkBox' ? (
                          <div key={field.name}>
                            <label className='label-filtro'>
                              <input 
                                className='form-check-input' 
                                type='checkbox' 
                                onChange={
                                  (e) => saveFilterCheck(e.target.checked, field.options.webLabel, field.name, index, field.type, itemsFilter, setItemsFilter)
                                } 
                                value={field.options.webLabel}/>
                              &nbsp;{field.options.webLabel}
                            </label>
                          </div>
                        ) : field.type === 'multiCheckFS' && (
                          <div key={field.name}>
                            <label className='label-filtro'>{field.options.webLabel}</label>
                            <label className="theme">
                              <input 
                                type="checkbox" 
                                className="toggle-check"
                                onChange={ 
                                  (e) => isExclude(e.target.checked, field.name, exclude, setExclude, itemsFilter, setItemsFilter)
                                }
                              />
                              <span className="slider"></span>
                              <span className="option">Debe cumplir todas las condiciones</span>
                            </label>
                            {field.options.items.map(opItem=> (
                              <label key={opItem.label} className='label-multicheck'>
                                <input 
                                  className='form-check-input' 
                                  type='checkbox' 
                                  onChange={
                                    (e) => saveFilterMultiCheck(e.target.checked, opItem.value, field.name, field.type, index, itemsFilter, setItemsFilter, exclude)
                                  }
                                  value={opItem.label}/>
                                &nbsp;{opItem.label}
                              </label>
                            ))}
                          </div>
                        )
                      )
                    )
                  ))
                )
              ))
            ))}
          </div>
        )
      }
    </>
  );
}

export default Filtros;

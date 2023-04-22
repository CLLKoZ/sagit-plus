import React, { useEffect, useState } from 'react';
import '../../../Estilos/filtro.css'
import 'bootstrap/dist/css/bootstrap.css'

const Filtros = ({formFiltro, setFilter, setChangePanel}) => {

  const [itemsFilter, setItemsFilter] = useState();
  const [change, setChange] = useState(false);
  const [include, setInclude] = useState(null);

  useEffect(() => {
    setChangePanel(change)
    if (itemsFilter) {
      if (itemsFilter.length === 0) {
        setItemsFilter(null)
      } else {
        setFilter(itemsFilter)
      }
    } else {
      setFilter(itemsFilter)
    }
  }, [itemsFilter, change, setFilter, setChangePanel])

  useEffect(() => {
    setItemsFilter(null)
  }, [formFiltro])

  const saveFilterSelect = (value, fieldName, section, type) => {
    if (itemsFilter && value) {
      let bool = false
      itemsFilter.forEach((item, index) => {
        if (item.fieldName === fieldName){
          item.value = value
          setChange(!change)
          bool = true
        }
      })
      if (!bool){
        //Setea el objeto previo y el nuevo que venga
        setItemsFilter(prevState => {
          return [...prevState, {fieldName: fieldName, value: value, section: section, type: type}]
        })
      }
    } else if (fieldName && value === ''){
      const itemToRemove = {fieldName: fieldName, value: value, section: section, type: type}
      itemsFilter.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1)
      setChange(!change)
    } else {
      setItemsFilter([{fieldName: fieldName, value: value, section: section, type: type}])
    }
  }

  const saveFilterCheck = (checked, value, fieldName, section, type) => {
    if (itemsFilter && checked) {
      setItemsFilter(prevState => {
        return [...prevState, {fieldName: fieldName, value: value, section: section, type: type}]
      })
    } else if (!itemsFilter && checked) {
      setItemsFilter([{fieldName: fieldName, value: value, section: section, type: type}])
    } else if (!checked && itemsFilter) {
      const itemToRemove = {fieldName: fieldName, value: value, section: section, type: type}
      itemsFilter.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1)
      setChange(!change)
    }
  }

  const saveFilterMultiCheck = (checked, value, fieldName, type, section) => {
    if (itemsFilter && checked) {
      setItemsFilter(prevState => {
        return [...prevState, {fieldName: fieldName, value: value, type: type, section: section}]
      })
    } else if (!itemsFilter && checked) {
      setItemsFilter([{fieldName: fieldName, value: value, type: type, section: section}])
    } else if (!checked && itemsFilter) {
      const itemToRemove = {fieldName: fieldName, value: value, type: type, section: section}
      itemsFilter.splice(itemsFilter.findIndex(a => a.value === itemToRemove.value), 1)
      setChange(!change)
    }
  }

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
                              className='selectFiltro' 
                              onChange={
                                e => saveFilterSelect(e.target.value, field.name, index, field.type)
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
                                  e => saveFilterCheck(e.target.checked, field.options.webLabel, field.name, index, field.type)
                                } 
                                value={field.options.webLabel}/>
                              &nbsp;{field.options.webLabel}
                            </label>
                          </div>
                        ) : field.type === 'multiCheckFS' && (
                          <div key={field.name}>
                            <label className='label-filtro'>{field.options.webLabel}</label>
                            {field.options.items.map(opItem=> (
                              <label key={opItem.label} className='label-multicheck'>
                                <input 
                                  className='form-check-input' 
                                  type='checkbox' 
                                  onChange={
                                    e => saveFilterMultiCheck(e.target.checked, opItem.value, field.name, field.type, index)
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

/* Funciones de modificación a los filtros */

export const saveFilterSelect = (value, fieldName, section, type, itemsFilter, setItemsFilter) => {
  if (itemsFilter && value) {
    let bool = false;
    itemsFilter.forEach((item, index) => {
      if (item.fieldName === fieldName){
        setItemsFilter(prevState => {
          prevState[index].value = value;
          return [...prevState];
        })
        bool = true;
      }
    })
    
    if (!bool){
      //Setea el objeto previo y el nuevo que venga
      setItemsFilter(prevState => {
        return [...prevState, {fieldName: fieldName, value: value, section: section, type: type}];
      })
    }
  } else if (fieldName && value === ''){
    const itemToRemove = {fieldName: fieldName, value: value, section: section, type: type};
    setItemsFilter(prevState => {
      prevState.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1);
      return [...prevState];
    })
  } else {
    setItemsFilter([{fieldName: fieldName, value: value, section: section, type: type}]);
  }
}

export const saveFilterCheck = (checked, value, fieldName, section, type, itemsFilter, setItemsFilter) => {
  if (itemsFilter && checked) {
    setItemsFilter(prevState => {
      return [...prevState, {fieldName: fieldName, value: value, section: section, type: type}];
    })
  } else if (!itemsFilter && checked) {
    setItemsFilter([{fieldName: fieldName, value: value, section: section, type: type}]);
  } else if (!checked && itemsFilter) {
    const itemToRemove = {fieldName: fieldName, value: value, section: section, type: type};
    setItemsFilter(prevState => {
      prevState.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1);
      return [...prevState];
    })
  }
}

export const saveFilterMultiCheck = (checked, value, fieldName, type, section, itemsFilter, setItemsFilter, exclude) => {
  let flag = false;
  let excFlag = false;
  if (exclude) {
    exclude.forEach(inc => {
      if (inc.fieldName === fieldName)
        excFlag = true
    })
    flag = !(flag);
    if (itemsFilter && checked) {
      let bool = false;
      itemsFilter.forEach((item, index) => {
        if (item.fieldName === fieldName) {
          setItemsFilter(prevState => {
            prevState[index].value.push(value);
            return [...prevState];
          })
          bool = true
        }
      })
      if (!bool) {
        setItemsFilter(prevState => {
          return [...prevState, {fieldName: fieldName, value: [value], type: type, section: section, isExclude: excFlag}];
        })
      }
    } else if (!itemsFilter && checked) {
      setItemsFilter([{fieldName: fieldName, value: [value], type: type, section: section, isExclude: excFlag}]);
    } else if (!checked && itemsFilter) {
      const itemToRemove = {fieldName: fieldName, value: value, type: type, section: section}
      itemsFilter.forEach((item, index) => {
        if (item.fieldName === fieldName){
          setItemsFilter(prevState => {
            if (prevState[index].value.length > 1) {
              const indexToRemove = itemsFilter[index].value.indexOf(itemToRemove.value);
              itemsFilter[index].value.splice(indexToRemove, 1);
              return [...prevState];
            } else {
              prevState.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1)
              return [...prevState];
            }
          })
        }
      })
    }
  } else if (!exclude || !flag) {
    flag = !(flag);
    if (itemsFilter && checked) {
      let bool = false;
      itemsFilter.forEach((item, index) => {
        if (item.fieldName === fieldName) {
          setItemsFilter(prevState => {
            prevState[index].value.push(value);
            return [...prevState];
          })
          bool = true
        }
      })
      if (!bool) {
        setItemsFilter(prevState => {
          return [...prevState, {fieldName: fieldName, value: [value], type: type, section: section, isExclude: false}];
        })
      }
    } else if (!itemsFilter && checked) {
      setItemsFilter([{fieldName: fieldName, value: [value], type: type, section: section, isExclude: false}]);
    } else if (!checked && itemsFilter) {
      const itemToRemove = {fieldName: fieldName, value: value, type: type, section: section, isExclude: false}
      itemsFilter.forEach((item, index) => {
        if (item.fieldName === fieldName){
          setItemsFilter(prevState => {
            if (prevState[index].value.length > 1) {
              const indexToRemove = itemsFilter[index].value.indexOf(itemToRemove.value);
              itemsFilter[index].value.splice(indexToRemove, 1);
              return [...prevState];
            } else {
              prevState.splice(itemsFilter.findIndex(a => a.fieldName === itemToRemove.fieldName), 1)
              return [...prevState];
            }
          })
        }
      })
    }
  }
}

export const isExclude = (checked, fieldName, exclude, setExclude, itemsFilter, setItemsFilter) => {
  let aux = []
  
  if (exclude && checked) {
    if (itemsFilter) {
      itemsFilter.forEach((item, itemIndex)=> {
        if (item.fieldName === fieldName) {
          setItemsFilter(prevState => {
            prevState[itemIndex].isExclude = true;
            return [...prevState];
          })
        }
      })
    }
    setExclude(prevState => {
      return [...prevState, {fieldName: fieldName, isExclude: checked}];
    })
  } else if (!exclude && checked) {
    if (itemsFilter) {
      setItemsFilter(prevState => {
        prevState.forEach(prev => {
          if(prev.fieldName === fieldName)
            prev.isExclude = !(prev.isExclude);
        })
        return [...prevState]
      })
    }
    setExclude([{fieldName: fieldName, isExclude: checked}]);
  } else if (!checked && exclude) {
    const itemToRemove = {fieldName: fieldName, isExclude: checked};
    if (itemsFilter) {
      itemsFilter.forEach(item => {
        if (item.fieldName === fieldName) {
          setItemsFilter(prevState => {
            prevState.forEach(prev => {
              if (prev.fieldName === fieldName)
                prev.isExclude = false
            })
            return [...prevState];
          })
        }
      })
    }
    setExclude(prevState => {
      prevState.splice(exclude.findIndex(a => a.fieldName === itemToRemove.fieldName && a.checked !== itemToRemove.checked  ), 2);
      aux.push(...prevState)
      return aux;
    })
  }
}
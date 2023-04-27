/**
 * Returns a function that will be invoked until the timeout is over.
 * This timeout restarts evertime the function gets invoked before
 * the interval stablished.
 * @param ms interval of time to wait for next invocation of the function.
 * By default value is `500`.
 * @param fn function, accepting any number of arguments, to debounce.
 */
export const debounce = (ms = 500, fn) => {
  let inDebounce;
  return (...params) => {
    window.clearTimeout(inDebounce);
    inDebounce = window.setTimeout(() => fn.apply(null, params), ms);
  };
};

/**
 * Prints a CSV file.
 * 
 * @param {string} csvContent - String correctly formatted in CSV
 */
export const printCSV = (csvContent) => {
  if (csvContent) {
    const link = document.createElement("a");

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let min = today.getMinutes();

    today = dd + '-' + mm + '-' + yyyy + '_' + hh + '-' + min;

    link.setAttribute("href", csvContent);
    link.setAttribute("download", `Reporte_${today}.csv`);

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }
}

export const addTools = (setHideElement) => {
  let path = window.location.pathname

    if (path === '/mapa' ) {
      setHideElement(false);
    } else {
      setHideElement(true);
    }
}
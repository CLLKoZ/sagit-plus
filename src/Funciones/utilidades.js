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
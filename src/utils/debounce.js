const defaultTimeout = 300

/**
 *
 * @param {Function} func
 * @param {Number} timeout
 * Wraps any function.
 */
export function useDebounce(func, timeout = defaultTimeout) {
  let timer
  return function debounce(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, timeout)
  }
}

/**
 *
 * @param {Function} func
 * @param {Number} timeout - default: 300
 * Wraps any function. Only the first call is executed, ignoring the other for the provided time amount
 */
export function useDebounceLeading(func, timeout = defaultTimeout) {
  let timer
  return function debounceLeading(...args) {
    if (!timer) func.apply(this, args)
    clearTimeout(timer)
    timer = setTimeout(() => {
      timer = undefined
    }, timeout)
  }
}

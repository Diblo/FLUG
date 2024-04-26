/**
 * 
 * @param {HTMLElement} element 
 * @returns 
 */
export const calcElementHeight = (element) => {
  const { marginTop, marginBottom } = window.getComputedStyle(element)
  return element.offsetHeight + parseFloat(marginTop) + parseFloat(marginBottom)
}

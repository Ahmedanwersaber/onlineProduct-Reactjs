/**
 * 
 * @param {string} txt '-' the input text to be sliced  
 * @param {number} max '-' the maximum length before truncation  
 * @returns 
 */

export function txtSlicer(txt: string, max: number = 50) {
  if (txt.length >= max) return `${txt.slice(0, max)} ...`;
  return txt;
}

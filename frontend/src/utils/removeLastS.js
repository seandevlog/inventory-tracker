export const removeLastS = (string) => {
  if (string && typeof string !== 'string') throw new Error('Must be a string');
  return string.charAt(string.length - 1).toLowerCase() === 's'
    ? string.slice(0, string.length - 1)
    : string; 
}
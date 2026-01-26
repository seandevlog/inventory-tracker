const firstCharUppercase = (string) => {
  if (typeof string === 'string') 
    return string.charAt(0).toUpperCase().concat(string.slice(1));

  throw new Error('Parameter requires a string');
}

export default firstCharUppercase;
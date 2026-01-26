const splitUppercase = (string) => {
  if (typeof string === 'string')
    return string.replace(/([a-z])([A-Z])/g, "$1 $2");
  throw new Error('Parameter must be a string');
}

export default splitUppercase

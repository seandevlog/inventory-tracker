export const loaderWithPath = (loader, path) => {
  return (args) => loader({...args, path});
}
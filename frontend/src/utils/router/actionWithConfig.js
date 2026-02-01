export const actionWithConfig = ({ action, path, schema }) => {
  return (args) => action({...args, path, schema});
}
const getTopLevelRoute = (path) => {
  if (typeof path === 'string') {
    const match = path.match(/^\/([^\/]+)/);
    
    return match?.[1];
  } 
  throw new Error('String is required to get top level route');
}

export default getTopLevelRoute;
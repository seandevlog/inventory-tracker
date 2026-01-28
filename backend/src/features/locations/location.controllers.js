import * as service from './location.services.js';

export const getLocation = async (req, res) => {
  const location = await service.getLocation({ locationId: req.params.id });

  return res.status(200).json({ location });
}

export const getAllLocation = async (req, res) => {
  const locations = await service.getAllLocation();

  return res.status(200).json({ locations });
}

export const storeLocation = async (req, res) => {
  await service.storeLocation({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateLocation = async (req, res) => {
  await service.updateLocation({ 
    locationId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteLocation = async (req, res) => {
  await service.deleteLocation({ locationId: req.params.id });
  
  res.status(200).json({ success: true });
}
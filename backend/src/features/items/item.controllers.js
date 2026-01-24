import * as service from './item.services.js';

export const getItem = async (req, res) => {
  const item = await service.getItem({ itemId: req.params.id });

  return res.status(200).json({ item });
}

export const getAllItem = async (req, res) => {
  const items = await service.getAllItem();

  return res.status(200).json({ items });
}

export const storeItem = async (req, res) => {
  await service.storeItem({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateItem = async (req, res) => {
  await service.updateItem({ 
    itemId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteItem = async (req, res) => {
  await service.deleteItem({ itemId: req.params.id });
  
  res.status(200).json({ success: true });
}
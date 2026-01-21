import * as service from './user.services.js';

export const getUser = async (req, res) => {
  const user = await service.getUser({ userId: req.params.id });

  return res.status(200).json({ user });
}

export const getAllUser = async (req, res) => {
  const users = await service.getAllUser();

  return res.status(200).json({ users });
}

export const storeUser = async (req, res) => {
  await service.storeUser({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateUser = async (req, res) => {
  await service.updateUser({ 
    userId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteUser = async (req, res) => {
  await service.deleteUser({ userId: req.params.id });
  
  res.status(200).json({ success: true });
}
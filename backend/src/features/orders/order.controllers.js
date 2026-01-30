import * as service from './order.services.js';

export const getOrder = async (req, res) => {
  const order = await service.getOrder({ orderId: req.params.id });

  return res.status(200).json({ order });
}

export const getAllOrder = async (req, res) => {
  const orders = await service.getAllOrder();

  return res.status(200).json({ orders });
}

export const storeOrder = async (req, res) => {
  await service.storeOrder({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateOrder = async (req, res) => {
  await service.updateOrder({ 
    orderId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteOrder = async (req, res) => {
  await service.deleteOrder({ orderId: req.params.id });
  
  res.status(200).json({ success: true });
}
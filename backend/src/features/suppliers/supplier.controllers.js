import * as service from './supplier.services.js';

export const getSupplier = async (req, res) => {
  const supplier = await service.getSupplier({ supplierId: req.params.id });

  return res.status(200).json({ supplier });
}

export const getAllSupplier = async (req, res) => {
  const suppliers = await service.getAllSupplier();

  return res.status(200).json({ suppliers });
}

export const storeSupplier = async (req, res) => {
  await service.storeSupplier({ data: req.body });

  res.status(200).json({ success: true });
}

export const updateSupplier = async (req, res) => {
  await service.updateSupplier({ 
    supplierId: req.params.id,
    data: req.body
  });
  
  res.status(200).json({ success: true })
}

export const deleteSupplier = async (req, res) => {
  await service.deleteSupplier({ supplierId: req.params.id });
  
  res.status(200).json({ success: true });
}
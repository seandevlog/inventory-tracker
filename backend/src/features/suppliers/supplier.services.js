import {v2 as cloudinary} from 'cloudinary';
import Suppliers from './supplier.model.js';
import { supplierSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getSupplier = async ({ supplierId }) => {
  if (!supplierId) throw new BadRequestError('Supplier ID is required');

  const supplier = await Suppliers.findOne({ _id: supplierId }).lean();
  if (!supplier) throw new Error('Failed to find supplier');

  return supplier;
}

export const getAllSupplier = async () => {
  const suppliers = await Suppliers.find({}).lean();
  if (!suppliers) throw new Error('Failed to find suppliers');

  return suppliers;
}

export const storeSupplier = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = supplierSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const supplier = await Suppliers.create({ ...value});

  return supplier;
}

export const updateSupplier = async ({ supplierId, data }) => {
  if (!supplierId) throw new BadRequestError('Supplier ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const keys = supplierSchema._ids._byKey.keys().toArray();
  const optionalSuppliersSchema = supplierSchema.fork(keys, (field) => field.optional());

  const { value, error } = optionalSuppliersSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const supplier = await Suppliers.findOneAndUpdate({ _id: supplierId }, {...value });
  if (!supplier) throw new Error('Failed to find supplier');

  return supplier;
}

export const deleteSupplier = async ({ supplierId }) => {
  if (!supplierId) throw new BadRequestError('Supplier ID is required');

  const oldSupplier = await Suppliers.findOneAndDelete({ _id: supplierId });
  if (!oldSupplier) throw new Error('Failed to find and delete supplier');

  if (oldSupplier.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldSupplier.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldSupplier.feature.public_id} from cloud`);
  }

  return oldSupplier;
}


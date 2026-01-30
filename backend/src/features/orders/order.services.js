import {v2 as cloudinary} from 'cloudinary';
import Orders from './order.model.js';
import Suppliers from '#features/suppliers/supplier.model.js';
import Items from '#features/items/item.model.js';
import { orderSchema } from '@my-org/shared/validators';
import { BadRequestError } from '#errors/index.js';

export const getOrder = async ({ orderId }) => {
  if (!orderId) throw new BadRequestError('Order ID is required');

  const order = await Orders.findOne({ _id: orderId })
    .populate({
      path: 'supplier',
      select: 'email -_id'
    })
    .populate({
      path: 'item',
      select: 'sku -_id'
    })  
    .lean();

  if (!order) throw new Error('Failed to find order');

  const flatOrder = { 
    ...order,
    email: order.supplier.email,
    sku: order.item.sku,
    isActive: order.item.isActive
  }

  delete order.supplier;
  delete order.item;

  return flatOrder;
}

export const getAllOrder = async () => {
  const orders = await Orders.find({})
    .populate({
      path: 'supplier',
      select: 'email -_id'
    })
    .populate({
      path: 'item',
      select: 'sku -_id'
    })
    .lean();

  if (!orders) throw new Error('Failed to find orders');

  const flatOrders = orders.map(order => {
    const flatOrder = {
      ...order,
      email: order.supplier.email,
      sku: order.item.sku,
      isActive: order.item.isActive
    }

    delete order.supplier;
    delete order.item;
    return flatOrder;
  })

  return flatOrders;
}

export const storeOrder = async ({ data }) => {
  if (!data) throw new BadRequestError('Data is required');

  const { value, error } = orderSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const { email, sku } = value;

  const [supplier, item] = await Promise.all([
    Suppliers.findOne({ email }).lean(),
    Items.findOne({ sku }).lean()
  ])

  if (!supplier) throw new BadRequestError('Supplier not found');
  if (!item) throw new BadRequestError('Item not found');

  const order = await Orders.create({ 
    ...value, 
    email: undefined, 
    sku: undefined, 
    supplier,
    item
  });
  return order;
}

export const updateOrder = async ({ orderId, data }) => {
  if (!orderId) throw new BadRequestError('Order ID is required');
  if (!data) throw new BadRequestError('Data is required');

  const { email, sku } = data;
  
  const keys = orderSchema._ids._byKey.keys().toArray();
  const optionalOrdersSchema = orderSchema.fork(keys, (field) => field.optional());

  const { value, error } = optionalOrdersSchema.validate(data);
  if (typeof error !== 'undefined' && error) {
    throw new BadRequestError(error);    
  } 

  const [ supplier, item ] = await Promise.all([
    email ? Items.findOne({ email }).lean() : Promise.resolve(undefined),
    sku ? Suppliers.findOne({ sku }).lean() : Promise.resolve(undefined)
  ]);
  
  if (!supplier) throw new BadRequestError('Supplier not found');
  if (!item) throw new BadRequestError('Item not found');
  
  const order = await Orders.findOneAndUpdate({ _id: orderId }, {
    ...value,
    email: undefined, 
    sku: undefined, 
    supplier,
    item 
  });
  
  if (!order) throw new Error('Failed to find order');

  return order;
}

export const deleteOrder = async ({ orderId }) => {
  if (!orderId) throw new BadRequestError('Order ID is required');

  const oldOrder = await Orders.findOneAndDelete({ _id: orderId });
  if (!oldOrder) throw new Error('Failed to find and delete order');

  if (oldOrder.feature?.public_id) {
    const cloudinaryRes = await cloudinary.uploader.destroy( 
      oldOrder.feature.public_id
    );
    if (cloudinaryRes.result !== 'ok') throw new Error(`Cloudinary Error: Failed to destroy ${oldOrder.feature.public_id} from cloud`);
  }

  return oldOrder;
}


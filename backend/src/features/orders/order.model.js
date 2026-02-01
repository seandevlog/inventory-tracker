import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const allowedStatus = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

const orderSchema = new Schema({
  // id: String (automatically generated)
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier',
    required: [ true, 'Supplier is required' ]
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [ true, 'Item is requried' ]
  },

  status: {
    type: String,
    enum: allowedStatus,
    required: [ true, `Status must be one of: ${allowedStatus.join(', ')}` ]
  },

  qty: {
    type: Number,
    min: 0,
    required: true
  },

  unitCost: {
    type: String,
    validate: {
      validator: x => Number.isInteger(x * 100),
      message: 'Amount must have at least two decimal places'
    },
    required: true
  },

  feature: featureSchema,

}, { 
  timestamps: true,
  statics: {
    findByIdWithRelations(orderId) {
      return this.findOne({ _id: orderId })
      .populate({
        path: 'supplier',
        select: 'email -_id'
      })
      .populate({
        path: 'item',
        select: 'sku -_id'
      })
    },
    findAllWithRelations() {
      return this.find()
        .populate({
          path: 'supplier',
          select: 'email -_id'
        })
        .populate({
          path: 'item',
          select: 'sku -_id'
        })
    }
  } 
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
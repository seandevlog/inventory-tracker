import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const allowedTypes = ['purchase', 'sale', 'returnFromCustomer', 'returnToSupplier', 'transfer', 'adjustment', 'scrap', 'production', 'consignmentIn', 'consignmentOut'];

const transactionSchema = new Schema({
  // id: String (automatically generated)
  type: {
    type: String,
    enum: allowedTypes,
    required: [ true, `Type must be one of: ${allowedTypes.join(', ')}` ]
  },

  item: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item',
    required: [ true, 'Item is required' ]
  },

  qty: {
    type: Number,
    min: 0,
    required: true
  },

  fromLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: false
  },

  toLocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Location',
    required: true
  },

  unitCost: {
    type: String,
    validate: {
      validator: x => Number.isInteger(x * 100),
      message: 'Amount must have at least two decimal places'
    },
    required: false
  },

  note: {
    type: String,
    required: false
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [ true, 'Created by is required' ]
  },

  feature: featureSchema,

}, { timestamps: true });

const transactionModel = mongoose.model('Transaction', transactionSchema);
export default transactionModel;
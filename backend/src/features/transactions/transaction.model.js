import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const allowedTypes = ['purchase', 'sale', 'returnFromCustomer', 'returnToSupplier', 'transfer', 'adjustment', 'scrap', 'production', 'consignmentIn', 'consignmentOut'];

const transactionSchema = new Schema({
  // id: String (automatically generated)
  type: {
    type: String,
    enum: allowedTypes,
    required: [ true, `Type must be one of: ${allowedTypes.join(', ')}` ],
    validate: {
      validator: function (value) {
        const toRequired = ['purchase', 'returnFromCustomer', 'production', 'consignmentIn', 'adjustment', 'transfer']

        const fromRequired = ['sale', 'returnToSupplier', 'scrap', 'consignmentOut', 'transfer'];

        if (value === 'transfer' && !this.fromLocation && !this.toLocation) {
          throw new Error('From and To Location are required');
        }

        if (fromRequired.includes(value) && !this.fromLocation) {
          throw new Error('From Location is required');
        }

        if (toRequired.includes(value) && !this.toLocation) {
          throw new Error('To Location is required');
        }

        return true;
      }
    }
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
    required: false
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
}, { 
  timestamps: true,
  statics: {
    findByIdWithRelations(transactionId) {
      return this.findOne({ _id: transactionId })
        .populate({ path: 'item', select: 'sku -_id'})
        .populate({ path: 'fromLocation', select: 'code -_id' })
        .populate({ path: 'toLocation', select: 'code -_id' })
        .populate({ path: 'createdBy', select: 'username -_id' });
    },
    findAllWithRelations() {
      return this.find()
        .populate({ path: 'item', select: 'sku -_id' })
        .populate({ path: 'fromLocation', select: 'code -_id' })
        .populate({ path: 'toLocation', select: 'code -_id' })
        .populate({ path: 'createdBy', select: 'username -_id' });
    },
  }
});

const transactionModel = mongoose.model('Transaction', transactionSchema);
export default transactionModel;
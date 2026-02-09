import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const supplierSchema = new Schema({
  // id: String (automatically generated)
  email: {
    type: String,
    required: [true, 'Field is required'],
    unique: [true, 'Email is used'],
    validate: {
      validator: function (x) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(x);
      },
      message: 'Email must have a valid email format'
    }
  },
  name: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: false
  },

  address: {
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

const supplierModel = mongoose.model('Supplier', supplierSchema);
export default supplierModel;
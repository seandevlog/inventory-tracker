import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const allowedCategories = ['room', 'food', 'amenities', 'housekeeping', 'services', 'events', 'retail', 'technology', 'fees', 'maintenance'];

const itemSchema = new Schema({
  // id: String (automatically generated)
  sku: {
    type: String,
    validate: {
      validator: function(x) {
        return /^(?=(?:[^A-Z]*[A-Z]){3,})[A-Z0-9-]+$/
        .test(x);
      },
    }
  },
  name: {
      type: String,
      required: true
  },

  unit: {
      type: String,
      required: false
  },

  category: {
      type: String,
      enum: allowedCategories,
      required: true
  },

  reorderPoint: {
      type: Number,
      min: 0,
      required: true
  },

  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'Status is required']
  },

  feature: featureSchema,

}, { timestamps: true });

const userModel = mongoose.model('Item', itemSchema);
export default userModel;
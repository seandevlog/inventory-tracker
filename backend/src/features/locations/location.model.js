import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const locationSchema = new Schema({
  // id: String (automatically generated)
  code: {
    type: String,
    validate: {
      validator: function(x) {
        return /^(?=(?:[^A-Z]*[A-Z]){3,})[A-Z0-9-]+$/
        .test(x);
      },
    },
    required: true,
    unique: [ true, 'Code already used' ] 
  },
  name: {
    type: String,
    required: true
  },

  notes: {
    type: String,
    required: false
  },

  feature: featureSchema,

}, { timestamps: true });

const locationModel = mongoose.model('Location', locationSchema);
export default locationModel;
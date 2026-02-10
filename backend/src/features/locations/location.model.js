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

  createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [ true, 'Created by is required' ]
    },

  feature: featureSchema,

}, { 
  timestamps: true,
  statics: {
    findByIdWithRelations(locationId) {
      return this.findOne({ _id: locationId })
        .populate({ path: 'createdBy', select: 'username -_id' });
    },
    findAllWithRelations() {
      return this.find()
        .populate({ path: 'createdBy', select: 'username -_id' });
    },
  }
});

const locationModel = mongoose.model('Location', locationSchema);
export default locationModel;
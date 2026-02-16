import mongoose from 'mongoose';
const { Schema } = mongoose;
import featureSchema from '#schema/feature.js';

const userSchema = new Schema({
  // id: String (automatically generated)
  username: {
    type: String,
    required: [ true, 'Username is required' ],
    unique: [ true, "Username taken. Maybe try 'Legendary_Unicorn_42'" ]
  },
  password: {
    type: String,
    required: [ true, 'Password is required' ],
    minlength: [ 12, 'Password should have 12 or more characters'],
    validate: {
      validator: function(x) {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{12,}$/.test(x);
      },
      message: 'Password should have a combination of uppercase letters, lowercase letters, numbers, and symbols'
    }
  },
  givenName: {
    type: String,
    required: [ true, 'Given Name is required' ]
  },
  familyName: {
    type: String,
    required: [ true, 'Family Name is required' ]
  },
  contact: {
    type: String,
    required: [ true, 'Contact is required' ]
  },
  address: {
    type: String,
    required: [ true, 'Address is required' ]
  },
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    required: [true, 'Status is required']
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    // required: [ true, 'Created by is required' ],
    default: 'null'
  },

  feature: featureSchema,
  role: {
    type: String,
    enum: ['admin', 'manager', 'staff'],
    default: ['staff']
  }
}, { 
  timestamps: true,
  statics: {
    findByIdWithRelations(itemId) {
      return this.findOne({ _id: itemId })
        .populate({ path: 'createdBy', select: 'username -_id' });
    },
    findAllWithRelations() {
      return this.find()
        .populate({ path: 'createdBy', select: 'username -_id' });
    }
  }
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
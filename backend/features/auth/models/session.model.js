import mongoose from 'mongoose';
const { Schema } = mongoose;

const sessionSchema = new Schema({
  hashedToken: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    rel: 'User',
    reuired: true
  },
  expiresIn: Date
})

const sessionModel = mongoose.model('Session', sessionSchema);

export default sessionModel;
import mongoose from 'mongoose';

const isMongoActive = () => (
  mongoose.connection.readyState === 1
)

export default isMongoActive;
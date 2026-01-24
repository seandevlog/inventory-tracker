import mongoose from "mongoose";
const { Schema } = mongoose;

const featureSchema = new Schema({
    url: {
        type: String
    },
    public_id: {
        type: String
    },
    _id: false
});

export default featureSchema;
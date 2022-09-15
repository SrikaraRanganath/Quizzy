import mongoose from "mongoose";

const resultSchema = mongoose.Schema({
    name: { type:String, required: true },
    taken: { type: Date },
    score: { type: Number, required: true },
    rating: { type:Number, required:false }
});

export default resultSchema;
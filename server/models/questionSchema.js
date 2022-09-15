import mongoose from "mongoose";

const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answers: { type: [String], length:4, required: true },
    correctanswer: {type: Number, required: true},
});

export default questionSchema;
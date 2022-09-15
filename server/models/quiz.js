import mongoose from 'mongoose';
import questionSchema from './questionSchema.js';
import resultSchema from './resultSchema.js';

const quizSchema = mongoose.Schema({
    id: { type: String },
    username: { type:String, required: true },
    name: { type:String, required: true },
    questions: { type: [questionSchema], length: 10 },
    start: { type: Date },
    end: { type: Date },
    duration: { type: Number, required: true },
    results: { type: [resultSchema] }
});


export default mongoose.model("Quiz",quizSchema);
import mongoose from "mongoose";
import Quiz from "../models/quiz.js";

const submitResult = async(req, res) => {
    try {
        const { id } = req.params;
        const result = req.body;
        if(!mongoose.Types.ObjectId.isValid(id)) {
            res.status(404).send('This id does not belong to any quiz');
        }

        const quiz = await Quiz.findByIdAndUpdate(id, { $push: { "results" : result } })
    } catch(error) {
        res.status(400).json({msg: error.message});
    }

};

export { submitResult };
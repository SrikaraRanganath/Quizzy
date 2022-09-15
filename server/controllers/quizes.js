import mongoose from "mongoose";
import Quiz from "../models/quiz.js";

const getQuizes = async (req, res) => {
    try {
        const quiz = await Quiz.find({username: req.params.username});
        res.status(200).json(quiz);
    } catch(error) {
        res.status(404).json({msg: error.message});
    }
}

const createQuiz = async(req,res) => {
    const { username, quizname, quizstart, quizend, questionduration } = req.body;
    const newQuiz = new Quiz({
        username: username,
        name: quizname,
        start: quizstart,
        end: quizend,
        duration: questionduration
    });
    try {
        await newQuiz.save();
        res.status(200).json(newQuiz);
    } catch(error) {
        res.status(409).json({msg: error.message});
    }
}

const editQuiz = async (req, res) => {
    const { id: _id } = req.params;
    const questions = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        res.status(404).send('This id does not belong to any quiz');
    }
    
    const updatedQuiz = await Quiz.findByIdAndUpdate(_id, {questions: questions}, {new: true} );

    res.json(updatedQuiz);
}

const deleteQuiz = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).send('This id does not belong to any quiz');
    }

    try {
        await Quiz.findByIdAndDelete(id);
    } catch (error) {
        console.log(error.message);
    }

    res.json({ msg: 'quiz deleted successfully' });
}

export { getQuizes, createQuiz, editQuiz, deleteQuiz };
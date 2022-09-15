import Quiz from "../models/quiz.js";

const getQuiz = async(req, res) => {
    try {
        const quiz = await Quiz.findOne({ _id: req.params.id });
        res.status(200).json(quiz);
    } catch (error) {
        res.status(404).json({msg: error.message});
    }
}

export { getQuiz };
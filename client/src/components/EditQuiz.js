import React,{ useState } from 'react';
import QuestionCard from './QuestionCard';
import { useDispatch } from 'react-redux';
import { editQuiz } from '../actions/quizes';
import { useNavigate } from 'react-router-dom';
import '../assets/styles/editquiz_style.css';

const EditQuiz = (props) => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getDummyQuestion = () => {
        return {
            _id: String(Math.random()),
            question: '',
            answers: [
            '',                  
            '',
            '',
            ''
        ],
        correctanswer: 0
        };
    }
    
    const [questions, setQuestions] = useState(props.editQuiz.questions.length===0 ? [getDummyQuestion()] : props.editQuiz.questions);
    
    const onClick = async (event) => {
        const updatedQuestions = getUpdatedQuestions();
        
        setQuestions([
            ...updatedQuestions,
            getDummyQuestion()
        ]);
    }

    const deleteQuestion = (questionId) => {
        const currQuestions = getUpdatedQuestions();
        setQuestions(
            currQuestions.filter((question) => question._id !== questionId)
        );
    }

    const onCheck = () => {
        if(questions.length===10) return true;
        else return false;
    }

    const getUpdatedQuestions = () => {
        const updatedQuestions = [];
    
        questions.forEach((question) => {
            const root = document.getElementById(`question-${question._id}`);
            const cquestion = root.children[0].children[1].value;
            const answers = [
                root.children[1].children[1].value,
                root.children[2].children[1].value,
                root.children[3].children[1].value,
                root.children[4].children[1].value
            ];
            const correctanswer = root.children[5].children[1].value;

            updatedQuestions.push({
                _id: question._id,
                question: cquestion,
                answers: answers,
                correctanswer: Number(correctanswer)
            });
        });

        return updatedQuestions;
    }
    
    const onBack = () => {
        const updateEdit = props.updateEdit;
        updateEdit();
    }

    const getFinalQuestions = () => {
        const questions = getUpdatedQuestions();
        let final = [];
        questions.map((question) => {
            final.push({
                question: question.question,
                answers: question.answers,
                correctanswer: question.correctanswer
            });
        })
        return final;
    }

    const onSubmit = (event) => {
        event.preventDefault(); 
        const updateEdit = props.updateEdit;
        dispatch(editQuiz(props.quizId, getFinalQuestions(), navigate));
        updateEdit();
    }

    return (
        <div className='edit-quiz'>
            <button className='back' onClick={onBack}>←</button>
            <label className='edit' id='edit'>edit your quiz</label>
            <button className='add' onClick={onClick} disabled={onCheck()}>add more</button><br></br>
            <label className='added'>added questions: {props.editQuiz.questions===undefined ? 1 : questions.length} / 10</label>
            <form id='question-form' onSubmit={onSubmit}>
            { 
                questions.map((question, index) => <QuestionCard key={Math.random()} id={question._id} no={index+1}  deleteQuestion={deleteQuestion} values={questions[index]} />)
            }
            <button className='save' type='submit'>save</button>
            </form>
        </div>
    );
};

export default EditQuiz;

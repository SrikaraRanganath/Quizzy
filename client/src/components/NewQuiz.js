import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { createQuiz } from '../actions/quizes';
import '../assets/styles/newquiz_style.css';

const NewQuiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onSubmit = (event) => {
        event.preventDefault();
        const formValues = {
            username: event.target[0].value,
            quizname: event.target[1].value,
            quizstart: new Date(event.target[2].value),
            quizend: new Date(event.target[3].value),
            questionduration: Number(event.target[4].value)
        };  

        dispatch(createQuiz(formValues, navigate));
    }

    const onBack = () => {
        window.history.go(-1);
    }
    useEffect(() => {
        const startQuiz = document.getElementsByClassName('quiz-start')[0];
        startQuiz.min=new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"));
        // const endQuiz= document.getElementsByClassName('quiz-end')[0];
        // console.log(new DateTime().getMonth()+(1));
    },[]);
    
    return (
        <div>
            <div  className='create-new'>
            <button className='back' onClick={onBack}>←</button>
            <span className="title">make a new one</span>
            <div className='create-form'>
                <form className='form' onSubmit={onSubmit}>
                    <div className='form-item'>
                        <label className='form-label'>username</label>
                        <input type="text" disabled={true} name="username" value="srikara01"/>
                    </div>
                    
                    <div className='form-item'>
                        <label className='form-label'>quiz name</label>
                        <input type="text" required={true} name="quizname" placeholder='React JS Fundamentals' />
                    </div>

                    <div className='form-item'>
                        <label className='form-label'>quiz start</label>
                        <input className="text quiz-start" type="datetime-local" name='quiz-start' required={true} />
                    </div>

                    <div className='form-item'>
                        <label className='form-label'>quiz end</label>
                        <input className="text quiz-end" type="datetime-local" name="quiz-end" required={true} placeholder='12:00'/>
                    </div>

                    <div className='form-item'>
                        <label className='form-label'>question time in seconds</label>
                        <input className="text question-time" type="number" max="500" min="1" name="question-time" required={true} placeholder='20 seconds'/>
                    </div>

                    <button className='finish' type='submit'>finish</button>
                </form>
                </div>
            </div>
        </div>
    );
};

export default NewQuiz;
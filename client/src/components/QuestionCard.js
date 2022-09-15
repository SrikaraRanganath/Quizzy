import React, { useState, useEffect } from 'react';

const QuestionCard = (props) => {
    
    const { id, values } = props; 

    const [changes, setChanges] = useState({
        question: values.question,
        answer1: values.answers[0],
        answer2: values.answers[1],
        answer3: values.answers[2],
        answer4: values.answers[3],
        correctanswer: values.correctanswer
    });

    useEffect(() => {
        document.getElementById(`question-${id}`).children[values.correctanswer].children[1].style.backgroundColor='#DADADA'
    });

    const onChange = (event) => {
    
        const root = document.getElementById(`question-${id}`);
        
        for(var i=1;i<=4;i++) {
            root.children[i].children[1].style.backgroundColor='white';
        }
        
        if(event.target.value != null) {
        root.children[event.target.value].children[1].style.backgroundColor='#DADADA'; }

        setChanges({ correctanswer: event.target.value });
    }

    const onClick = () => {
        const deleteQuestion = props.deleteQuestion;
        deleteQuestion(id);
    }

    const onQuestionChange = (event) => {
        setChanges({ question: event.target.value });
    }

    const onAnswer1Change = (event) => {
        setChanges({ answer1: event.target.value });
    }

    const onAnswer2Change = (event) => {
        setChanges({ answer2: event.target.value });
    }

    const onAnswer3Change = (event) => {
        setChanges({ answer3: event.target.value });
    }

    const onAnswer4Change = (event) => {
        setChanges({ answer4: event.target.value });
    }

    return( 
        <div className='question-card' id={`question-${id}`}>
            <div className='form-item'>
                <label className='q'>question {props.no}</label>
                <input className='qi' id="question" type="text" value={changes.question} onChange={onQuestionChange} autoComplete="off"/>
            </div>
            <div className='form-item'>
                <label className='a'>option 1</label>
                <input className='ai' id="1" type="text" value={changes.answer1} onChange={onAnswer1Change} autoComplete="off"/>
            </div>
            <div className='form-item'>
                <label className='a'>option 2</label>
                <input className='ai' id="2" type="text" value={changes.answer2} onChange={onAnswer2Change} autoComplete="off"/>
            </div>
            <div className='form-item'>
                <label className='a'>option 3</label>
                <input className='ai' id="3" type="text" value={changes.answer3} onChange={onAnswer3Change} autoComplete="off"/>
            </div>
            <div className='form-item'>
                <label className='a'>option 4</label>
                <input className='ai' id="4" type="text" value={changes.answer4} onChange={onAnswer4Change} autoComplete="off"/>
            </div>
            <div className='form-item'>
                <label className='an'>answer</label>
                <input className='ai l' type="number" min="1" max="4" value={changes.correctanswer} onChange={onChange} autoComplete="off"/>
                <button className='remove' onClick={onClick}>remove</button> 
            </div>
        </div>
    );
};

export default QuestionCard;
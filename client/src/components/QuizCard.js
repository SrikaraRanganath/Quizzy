import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteQuiz } from '../actions/quizes';
import '../assets/styles/quizcard_style.css';

const QuizCard = (props) => {
    
    const dispatch = useDispatch();

    const onCopy = () => {
        navigator.clipboard.writeText(`http://localhost:3000/user-take/${props.data._id}`);
        alert('link has been copied to clipboard');
    }

    const onEdit = () => {
        const updateEdit = props.updateEdit;
        const updateQuizId = props.updateQuizId;
        updateQuizId(props.data._id);
        updateEdit();
    }

    const onDelete = () => {
        if(window.confirm('Do you wish this delete this quiz ? This action cannot be undone later'))
        dispatch(deleteQuiz(props.data._id));
    }

    const onResult = () => {
        const updateResult = props.updateResult;
        const updateResultId = props.updateResultId;
        updateResult();
        updateResultId(props.data._id);
    }

    const startdate = String(new Date(new Date(props.data.start).getTime()));
    const start = Number(startdate.slice(16,18)) > 12 ? `${startdate.slice(0,15)}, ${Number(startdate.slice(16,18))-12}${startdate.slice(18,21)} PM` : `${startdate.slice(0,15)}, ${startdate.slice(16,21)} AM`;
    const enddate = String(new Date(new Date(props.data.end).getTime()));
    const end =  Number(enddate.slice(16,18)) > 12 ? `${enddate.slice(0,15)}, ${Number(enddate.slice(16,18))-12}${enddate.slice(18,21)} PM` : `${enddate.slice(0,15)}, ${enddate.slice(16,21)} AM`;
    
    return (
        <div className='card'> 
            <div className='content'>
                <span className='name'><span className='emp'>quiz name : </span>{props.data.name}</span>
                <span className='count'>added questions ❓ :  {props.data.questions.length}</span>
            </div>
            <div className='time-content'>
                <span className='qstart'><span className='emp'>quiz start ⏰ :</span> {start}</span>
                <span className='qend'>quiz end ⏰ : {end}</span>
                <span></span>
            </div>
            <div className='link-content'>
                <span className='link'><span className='emp'>link: </span> http://localhost:3000/user-take/{props.data._id}</span>
                <button className='action-btn copy' onClick={onCopy}>copy link</button>
            </div>
            <div className='duration'>
                <span className='qduration'><span className='emp'>question duration ⌛ : </span>{props.data.duration} seconds </span>
            </div>
            <div className='actions'>
                <button className='action-btn' onClick={onEdit}>Preview/edit</button>
                <button className='action-btn' onClick={onDelete}>Delete</button>
                <button className='action-btn' onClick={onResult}>view results</button>
            </div>
        </div>
    )
}

export default QuizCard;
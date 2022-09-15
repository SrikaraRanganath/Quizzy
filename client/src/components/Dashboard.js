import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import QuizCard from "./QuizCard";
import { useSelector } from "react-redux";
import { getQuizes } from "../actions/quizes";
import Results from "./Results";
import EditQuiz from "./EditQuiz";

import '../assets/styles/dashboard.css';

const Dashboard = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const username = JSON.parse(localStorage.getItem('profile'))?.result.username;
        dispatch(getQuizes(username));
    },
    [dispatch]);
    
    const quizes = useSelector((state) => state.quizes);
    
    const [ edit, setEdit ] = useState(false);
    const [ editId, setEditId ] = useState(null);
    const [ result, setResult] = useState(false);
    const [ resultId, setResultId ] = useState(null);

    const updateEdit = () => {
        setEdit(!edit);
    }
    
    const updateQuizId = (quizId) => {
        setEditId(quizId);
    }

    const updateResult = () => {
        setResult(!result);
    }

    const updateResultId = (quizId) => {
        setResultId(quizId);
    }

    return(
        <div>
            { 
            edit===false && result===false
            ?
            <div className="main-dash">
                {
                edit===false 
                ?
                <span className="title">here's your quiz collection, {JSON.parse(localStorage.getItem('profile')).result.username} 
                <Link to='/new'>
                    <button className="create-btn">
                        new
                    </button>
                </Link>
                </span>
                :
                null
                }
                <div className="quiz-cards">
                    {quizes.length!==0 ? 
                    quizes.map((quiz) => {
                        return (
                            <QuizCard key={Math.random()} data={quiz} updateEdit={updateEdit} updateQuizId={updateQuizId} updateResult={updateResult} updateResultId={updateResultId} />
                        )
                    }) 
                    :
                    <label className="no-quiz">you are yet to create a quiz...</label>}
                </div>
            </div>
            :
                result===false 
                ?
                <EditQuiz editQuiz={ quizes.find((quiz) => quiz._id === editId ) } quizId={editId} updateEdit={updateEdit} />  
                :
                <Results quiz={ quizes.find((quiz) => quiz._id === resultId) } updateResult={updateResult} />
            }
        </div>
    );
    
};

export default Dashboard;
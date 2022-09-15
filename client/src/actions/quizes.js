import * as api from '../api';
import { FETCH_ALL_QUIZES, CREATE_QUIZ, EDIT_QUIZ, DELETE_QUIZ } from '../constants/actionTypes';

const username = localStorage.getItem('profile')===null ? null : JSON.parse(localStorage.getItem('profile')).result.username;

const getQuizes = (username) => async (dispatch) => {
    try {
        const {data} = await api.fetchQuizes(username);
        dispatch({type: FETCH_ALL_QUIZES, payload: data});
    } catch(error) {
        console.log(error.message);
    }
}

const createQuiz = (quiz, navigate) => async (dispatch) => {
    try {
        const { data } = await api.createQuiz(quiz);
        dispatch({type: CREATE_QUIZ, payload: data})
    } catch (error) {
        console.log(error.message);
    }
    navigate(`/${username}`);
}

const editQuiz = (quizId, questions, navigate) => async(dispatch) => {
    try {
        const { data } = await api.editQuiz(quizId, questions);
        dispatch({ type: EDIT_QUIZ, payload: data });
    } catch (error) {
        console.log(error.message);
    }
    navigate(`/${username}`);
}

const deleteQuiz = (quizId) => async(dispatch) => {
    try {
        await api.deleteQuiz(quizId);
        dispatch({ type: DELETE_QUIZ, payload: quizId });
    } catch (error) {
        console.log(error.message);
    }
}

export { getQuizes, createQuiz, editQuiz, deleteQuiz };
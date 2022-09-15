import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:5001' });
api.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        const profile = JSON.parse (localStorage.getItem('profile'));
        req.headers.Authorization = `Bearer ${profile.token}`;
    }

    return req;
});


export const fetchQuizes = async(username) => {
    return api.get(`/quizes/${username}`);
};

export const getQuiz = async(quizID) => {
    return axios.get(`http://localhost:5001/quiz/${quizID}`);
}

export const createQuiz = async(quiz) => {
    return api.post(`/quizes/`, quiz)
}

export const editQuiz = async(quizId, quiz) => {
    return api.patch(`/quizes/${quizId}`, quiz)
}

export const deleteQuiz = async(quizId) => {
    return api.delete(`/quizes/${quizId}`);
}

export const submitResult = async(quizID, result) => {
    return axios.post(`http://localhost:5001/result/${quizID}`, result)
}

export const login = (formValues) => {
    return api.post('/user/login', formValues);
}

export const signup = (formValues) => {
    return api.post('/user/signup',formValues);
}
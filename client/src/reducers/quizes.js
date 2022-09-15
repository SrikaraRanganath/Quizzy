const quizReducer = (state=[], action) => {
    switch(action.type) {
        case "FETCH_ALL_QUIZES":
            return action.payload;

        case "CREATE_QUIZ":
            return [...state, action.payload]

        case "EDIT_QUIZ":
            return state.map(quiz => quiz._id === action.payload._id ? action.payload : quiz);
        
        case "DELETE_QUIZ":
            return state.filter(quiz => quiz._id !== action.payload);
        
        default:
            return state; 
    }
}

export default quizReducer;
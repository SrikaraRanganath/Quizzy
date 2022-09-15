import { AUTHENTICATION, LOGOUT } from "../constants/actionTypes";

const authenticationReducer = (state = { authData: JSON.parse(localStorage.getItem('profile')) }, action) => {
    switch(action.type) {
        case AUTHENTICATION:
            localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));

            return {
                ...state,
                authData: action.payload
            }
        
        case LOGOUT:
            localStorage.clear();
            return {
                ...state,
                authData: null
            };
        
        default:
            return state;
    }
}

export default authenticationReducer;
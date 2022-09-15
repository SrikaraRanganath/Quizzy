import { combineReducers } from "redux";
import quizes from './quizes';
import authentication from './authentication';

export default combineReducers({
    quizes,
    authentication
});
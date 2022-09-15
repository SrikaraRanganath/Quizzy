import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, } from 'react-redux';
import { login, signup } from '../actions/authentication';
import '../assets/styles/authform_style.css';

const AuthForm = (props) => {
    const comp = props.comp==="login" ? true : false;
    const [isLoggedIn, setStatus] = useState(comp);
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const getStatus = async(formValues, navigate) => {
        await dispatch(login(formValues, navigate));
        setError(JSON.parse(localStorage.getItem('profile'))===null ? 'invalid login credentials. please enter the correct username and password.' : '');
    }

    const onSubmit = (event) => {
        event.preventDefault();
        let formValues;
        if(isLoggedIn) {
            formValues = { "username": event.target[0].value, "password": event.target[1].value };
            getStatus(formValues, navigate);
        }
        else {
            formValues = { "username": event.target[0].value, "password": event.target[1].value, "cpassword": event.target[2].value };
            dispatch(signup(formValues,navigate));
        }
    }       

    return (
        
        <div className='auth-form'>
            <h1>{isLoggedIn===true ? "Login" : "Join now"}</h1>
            <form className='form' onSubmit={onSubmit}>
                <span className='error'>{error}</span>
                <div className='ln1'>
                    <label>Username</label>
                    <input className="elem ln1" type="text" name="username" id="username" autoComplete='off' required placeholder='johndoe@12'/>
                </div>
                <div className='ln1'>
                    <label>Password</label>
                    <input className="elem ln2" type="password" name="password" id="password" autoComplete='off' required placeholder='********'/>
                </div>
                {
                isLoggedIn===false ? 
                    <div className='ln2'>
                        <label>Confirm It</label>
                        <input className="elem ln3" type="password" name="cpassword" id="cpassword" autoComplete='off' required placeholder='************'/>
                    </div> 
                : 
                    null
                }
                <button className="go" type="submit">
                    { isLoggedIn===true ? "Login" : "Signup"}
                </button> <span>or</span>
                <button className="switch" onClick={() => setStatus(!isLoggedIn)}>{ isLoggedIn!==true ? "Login" : "Signup"}</button>
            </form>
        </div> 
    );
};

export default AuthForm;

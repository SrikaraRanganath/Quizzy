import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../assets/styles/header_style.css';

const Header = () => {
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        // const token = user?.token;
        // if(token) {

        // }
        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
        navigate('/');
        setUser(null);
    }
    
    return(
        window.location.href.split('/')[3]!=='user-take'
        ? (
        user === null
        ? (
        <nav className='header'>
            <button className='site'>
                <Link to='/'>Quizzy</Link>
            </button>
            
            <button className='right last'>
                <Link to='/signup'>Signup</Link>
            </button>

            <button className='right'>
                <Link to='/login'>Login</Link>
            </button>

            <button className='right'>
                <Link to='/about'>About</Link>
            </button>
        </nav>
        ) : 
        (
        <nav className='header'>
            <button className='site'>
                <Link to='/'>Quizzy</Link>
            </button>

            <button className='right logout' onClick={logout}>
                Logout
            </button>
            
            <button className='right'>
                <Link to='/about'>About</Link>
            </button>

            <button className='right user'>
                <Link to={`/${user===null ? null : user.result.username}`}>{user===null ? null : user.result.username}&#128522;</Link>
            </button>
        </nav>
        )
    )
    :
    null
    )
};

export default Header;
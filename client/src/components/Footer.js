import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../assets/styles/footer_style.css';

const Footer = () => {

    const [ message, setMessage ] = useState('');

    const onMessage = (event) => {
        event.preventDefault();
        event.target.children[2].value='';
        setMessage('message sent successfully...')
    }

    if(message !== '') {
        setTimeout(() => setMessage(''), 4000);
    } 

    return (
        <div className="footer">
            <div className='row'>
            <span className='main-text'>&#169; Quizzy 2022</span>
            </div>
            <div className='col-1'>
                <p className='quizzy'>Quizzy</p>
                <p className='text values-2'>↕ Seamless</p>
                <p className='text values-2'>‼ Fast</p>
                <p className='text values-2'>♪ Reliable</p>
            </div>
            <div className='col-1'>
                <p className='text heading'>Get in touch</p>
                <p className='text values'>quizzy@gmail.com</p>
                <p className='text values'>srikarar@gmail.com</p>
            </div>

            <div className='col-2'>
                <p className='text heading links'>Links</p>
                <Link to='/'><button className='text values'>Home</button></Link>
                <Link to='/about'><button className='text values'>About</button></Link>
                <Link to='/login'><button className='text values'>Login</button></Link>
                <Link to='/signup'><button className='text values'>Signup</button></Link>
            </div>

            <div className='col-3'>
                <p className='text heading last-contact'>Contact us</p>
                <form className='contact-form' onSubmit={onMessage}>
                    <label className='text send'>Send a message : </label>
                    <span className='message-success'>{message}</span>
                    <input type="text" className='message' onFocus={() => setMessage('')} placeholder='enter your message here...'/>
                    <button type='submit' className='submit-btn'>go</button>
                </form>
            </div>
        </div>
    );
};

export default Footer;
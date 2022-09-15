import React from "react";
import { Link } from 'react-router-dom';
import '../assets/styles/home_style.css';
import Mockup from '../assets/images/mockup.png';

const Home = () => {

    return (
        <div className="home">
            <div className="left-content">
            <div className="info-1">Need to quickly create a Quiz ?</div>
            <b><div className="info-2">Try Quizzy</div></b>
            <div className='info-3'><b>5 mins</b> is all it takes to </div>
            <ul className='repeating-counter-rule'>
                <li>create</li>
                <li>deploy</li>
                <li>conduct</li>
                <li>get the results</li>
            </ul>
            {
                localStorage.getItem('profile') === null 
                ?
                <button className="try">
                    <Link to='/signup'>
                        Join for Free
                    </Link> 
                </button>
                :
                null
            }
            <button className="read">
                <Link to='/about'>
                    Read More
                </Link>
            </button>
            </div>
            <div className="mockup">
                <img className="mockup-image" src={Mockup} alt="Mockup on Iphone"/>
            </div>
        </div>
    )
};

export default Home;
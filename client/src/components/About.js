import React from 'react';
import '../assets/styles/about_style.css';

const About = () => {
    return(
        <div className='about'>
            <h2 className='heading-about'>About Quizzy</h2>
            <p className='para'>
                <em>Quizzy</em> is a full stack web application that allows users to create and hold an online quiz experience seamlessly. It was designed with <u>scalability</u> in mind. By using the <strong>MERN</strong> stack and making use of redux, redux-thunk, axios, react-router, mongoose.
                The use of MongoDB for the database makes it extremely fast and scalable as it reduced the number of joins required to execute a query.
                In addition to scalability, it makes development extremely easy as the complex structure of the data and its relationship is reduced 
                to nested json like objects.
            </p>
            <p className='para'>
                To learn more click on the github link below
            </p>
            <h4 className='smaller-about'>Happy Quizzing 🤠</h4>
        </div>
    )
}

export default About;
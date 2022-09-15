import React, { useEffect, useState } from 'react';
import { getQuiz, submitResult } from '../api';
import  '../assets/styles/takequiz.css';

const TakeQuiz = () => {

    const [quiz, setQuiz] = useState(null);
    const [finish, setFinish] = useState(false);
    useEffect(() => {
        async function getquiz() {
            const {data} = await getQuiz(window.location.href.split('/')[4]);
            setQuiz(data);
        }
        getquiz();
    },[]);
    
    const startdate = String(new Date(new Date(quiz?.start).getTime()));
    const start = Number(startdate.slice(16,18)) > 12 ? `${startdate.slice(0,15)}, ${Number(startdate.slice(16,18))-12}${startdate.slice(18,21)} PM` : `${startdate.slice(0,15)}, ${startdate.slice(16,21)} AM`;
    const enddate = String(new Date(new Date(quiz?.end).getTime()));
    const end =  Number(enddate.slice(16,18)) > 12 ? `${enddate.slice(0,15)}, ${Number(enddate.slice(16,18))-12}${enddate.slice(18,21)} PM` : `${enddate.slice(0,15)}, ${enddate.slice(16,21)} AM`;
    
    const [comp, setComp] = useState('name');
    const [name, setName] = useState('');
    const [timer, setTimer] = useState(false);
    const [count, setCount] = useState(0);
    const [msg ,setMsg] = useState('');
    const [score, setScore] = useState(0);
    const [rating, setRating] = useState(null);

    const currTime = new Date().getTime();
    const startTime = new Date(quiz?.start).getTime();
    const endTime = new Date(quiz?.end).getTime();

    const onSubmit = (event) => {
        event.preventDefault();
        setName(event.target[0].value);
        setComp('questions');
        setTimer(true);
    }
    
    useEffect(() => {

        if(comp==='questions' && count!==quiz?.questions.length && msg==='') {
            const options = document.getElementsByClassName('inner-option');
            for(var i=0;i<4;i++) {
                options[i].style.backgroundColor='#DADADA';
                options[i].style.fontWeight='400';
            }
        }   

        if(comp==='questions' && count!==quiz?.questions.length) {
        document.getElementById('progress-in').style.width=`${((count+1) * 100 ) / quiz?.questions.length }%`;
        }

        if( rating!==null) {
            for(var j=1;j<=5;j++) {
                if(j!==rating)
                document.getElementById(`rating-${j}`).style.textDecoration='none';
                else
                document.getElementById(`rating-${j}`).style.textDecoration='underline';
            }
        }

        const time = document.getElementById('timer');
        let sec = quiz?.duration % 60;
        let min = Math.floor(quiz?.duration / 60);
        const TimerFunc = 
        timer === true && count!==quiz?.questions.length
        ?
        setInterval(() => {
        time.innerHTML = (min>9 ? '⌛'+min : '⌛0'+min)  + ':' + (sec>9 ? sec : '0'+sec);
        sec--;
        if(sec===-1 && min!==0) {
            min--;
        }
        if(sec===-1 && min===0) {
            clearInterval(TimerFunc);
            setMsg('')
            setCount(count+1);
            setTimer(true);
        }
    }, 1000)
    :
    null;
    });
    
    const onAnswer = (event) => {
        if(Number(event.target.id) === quiz?.questions[count].correctanswer) {
            document.getElementById(event.target.id).style.backgroundColor='rgb(196, 215, 170)';
            document.getElementById(event.target.id).style.fontWeight='600';
            setTimer(false);
            setMsg('correct answer ✔️');
            setScore(score+1);
        }
        else {
            document.getElementById(event.target.id).style.backgroundColor='rgb(205, 103, 103)';
            document.getElementById(event.target.id).style.fontWeight='600';
            setTimer(false);
            setMsg('wrong answer ❌');
        }
    };

    const onRating = (event) => {
        document.getElementById(`rating-${event.target.value}`).style.textDecoration='underline';
        setRating(Number(event.target.value));
    }

    const onFinish = (event) => {
        alert('response submitted successfully. you can now exit this window');
        const result = {
            name: name,
            taken: new Date(),
            score: score,
            rating: rating
        }
        submitResult(window.location.href.split('/')[4], result);
        setFinish(true);
    }

    return (
        comp==='name' 
        ?
        <div className='quiz-take'>
            <span className='header-quiz'>
                {quiz?.username}'s quiz&#128516;
            </span>
            <span className='id-quiz'>quiz ID:{quiz?._id}</span>
            <span className='header-quiz-name'>
                <b>name of the quiz :</b> {quiz?.name}
            </span>
            <div className='time-quiz'>
                <span className='start-quiz'><b>quiz active from &#9201; :</b> {start}</span>
                <span className='end-quiz'><b>quiz active till &#9201; :</b> {end}</span>
            </div>
            <div className='quiz-main'>
                <span className='quiz-error'>please make sure you are on time &#10071;</span>
            </div>
            { 
            currTime >= startTime && currTime <= endTime
               ?
                <form onSubmit={onSubmit}>
                    <label className='user-name'>enter your name</label>
                    <input type="text" className='input-name' name='input-name' placeholder="jack" autoComplete='off'/>
                    <button type="submit" className="name-quiz">go</button>
                </form>
                :
                <span className='time-error'>{currTime<startTime ? '🙃Oops, you are too early.....' : '🙃Oops, you are too late.....'}</span>
            }   
        </div>
        :
        <div className='quiz-take'>
            <span className='header-quiz'>
                {quiz?.username}'s quiz&#128516;
            </span>
            <span className='id-quiz'>quiz ID: {quiz?._id}</span>
            <span className='inner-name-quiz'>your name: {name}</span>
            {  count!==quiz?.questions.length ?
                <div className='question-quiz'>
                    <div className='progress-out'>
                        <div className='progress-in' id='progress-in'>
                        </div>
                    </div>    
                    <span className='inner-length'>{ `${count+1}/${quiz?.questions.length}` }</span>
                    <span className='inner-result' id='result'>{msg}</span>
                    <span className='inner-question'><b>question :</b> &nbsp; {quiz?.questions[count].question} </span>
                    <span className='timer' id='timer'>⌛00:00</span>
                    <span className='inner-option' id='1' onClick={msg==='' ? onAnswer : null}> {quiz?.questions[count].answers[0]} </span>
                    <span className='inner-option' id='2' onClick={msg==='' ? onAnswer : null}> {quiz?.questions[count].answers[1]} </span>
                    <span className='inner-option' id='3' onClick={msg==='' ? onAnswer : null}> {quiz?.questions[count].answers[2]} </span>
                    <span className='inner-option inner-last' id='4' onClick={msg==='' ? onAnswer : null}> {quiz?.questions[count].answers[3]} </span>
                </div>
                :
                <div className='question-quiz'>
                    <span className='result-score'>your score 🙌 : {`${score}/${quiz?.questions.length}`}</span>
                    <span className='result-feedback'>how would you rate this quiz?</span>
                    <div className='result-rating'>
                        <button className='ratings' value='1' onClick={onRating}>😔</button>
                        <button className='ratings' value='2' onClick={onRating}>😕</button>
                        <button className='ratings' value='3' onClick={onRating}>😐</button>
                        <button className='ratings' value='4' onClick={onRating}>😄</button>
                        <button className='ratings' value='5' onClick={onRating}>😎</button><br></br>
                        <span id='rating-1' className='rating-values'>1</span>
                        <span id='rating-2' className='rating-values'>2</span>
                        <span id='rating-3' className='rating-values'>3</span>
                        <span id='rating-4' className='rating-values'>4</span>
                        <span id='rating-5' className='rating-values'>5</span>
                    </div>    
                    <center>{finish!==true ? <button id='result-finish' className='result-finish' onClick={onFinish} >finish</button> : null }</center>
                </div>
            }
        </div>
    );
}

export default TakeQuiz;
import React, { useState } from 'react';
import '../assets/styles/results.css';

const Results = (props) => {
    
    const { quiz } = props;
    const ratingEmojis = [ '😔', '😕', '😐', '😄', '😎' ];

    const [ emoji, setEmoji ] = useState(true);

    const onBack = () => {
        const updateResult = props.updateResult;
        updateResult();
    }

    return (
        <div className='results'>
            <button className='back' onClick={onBack}>←</button>
            <h1 className='result-heading'>
                results
            </h1>
            <table className='result-table sortable'>
                <thead>
                    <tr className='result-table-header'>
                        <th>name</th>
                        <th>date and time</th>
                        <th>score</th>
                        <th onClick={() => setEmoji(!emoji)}>rating</th>
                    </tr>
                </thead>
                <tbody>
                {
                    quiz.results.map((result) => {
                        return <tr key={Math.random()}>
                            <td>{result.name}</td>
                            <td>{String(new Date(new Date(result.taken).getTime())).slice(0,23)}</td>
                            <td>{result.score}</td>
                            <td className='result-emojis'>{emoji===true ? ratingEmojis[result.rating-1] : result.rating}</td>
                        </tr>
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default Results;
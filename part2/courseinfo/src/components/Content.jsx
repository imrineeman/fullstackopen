import React from 'react';
import Part from './Part'


const Content = ({ parts }) => {

    const sumEx =
        parts.map(p => p.exercises).reduce((a, b) => a + b, 0)

    return (
        <div>
            {parts.map((part) =>
                <Part
                    key={part.id}
                    part={part} />)}
            <b>Total of {sumEx} exercises!</b>
        </div>
    )
}

export default Content

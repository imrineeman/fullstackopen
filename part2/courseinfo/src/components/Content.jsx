import React from 'react';
import Part from './Part'


const Content = ({ parts }) => {

    const sumArr = parts.map((part) => part.exercises)
    const sumEx = sumArr.reduce((a, b) => a + b, 0)

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

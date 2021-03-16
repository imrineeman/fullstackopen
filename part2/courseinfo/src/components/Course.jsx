import React from 'react';
import Header from './Header'
import Content from './Content'

const Course = (props) => {

    return (
        <div>
            <Header name={props.name} />
            <Content parts={props.parts} />
        </div>

    )
}

export default Course

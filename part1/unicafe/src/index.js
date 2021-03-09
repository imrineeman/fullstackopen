import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button
    onClick={props.handleClick}>
    {props.purpose}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const total = bad + neutral + good
  const average = (good + 0 * neutral + (-1) * bad) / total
  const positive = ((good / (bad + neutral + good)) * 100)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button purpose={`Good`} handleClick={() => setGood(good + 1)} />
      <Button purpose={`Neutral`} handleClick={() => setNeutral(neutral + 1)} />
      <Button purpose={`Bad`} handleClick={() => setBad(bad + 1)} />
      <div>
        <h2>Statistics</h2>
        <p> Good : {good}</p>
        <p> Neutral : {neutral}</p>
        <p> Bad : {bad}</p>
        <p>Total : {total}</p>
        <p> Average : {average}</p>
        <p> Positive : {positive}%</p>
      </div>
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

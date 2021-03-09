import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button
    onClick={props.handleClick}>
    {props.purpose}
  </button>
)

const Statistics = (props) => {
  const { good, neutral, bad } = props

  const total = good + neutral + bad
  const average = (good + 0 * neutral + (-1) * bad) / total
  const positive = ((good / (bad + neutral + good)) * 100)

  const getFormula = (formula) => {
    if (formula === `total`)
      return total

    else if (formula === `average`)
      return average

    else if (formula === `positive`)
      return positive

    else if (formula === 'good')
      return good

    else if (formula === `bad`)
      return bad

    else if (formula === 'neutral')
      return neutral

    else
      return <div>
        No Formula
    </div>
  }

  return (
    <div>
      {props.statistic} : {getFormula(props.formula)}
    </div>

  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const stateLength = good + neutral + bad
  console.log(stateLength)

  return (
    <>
      <h1>Give Feedback</h1>
      <Button purpose={`Good`} handleClick={() => setGood(good + 1)} />
      <Button purpose={`Neutral`} handleClick={() => setNeutral(neutral + 1)} />
      <Button purpose={`Bad`} handleClick={() => setBad(bad + 1)} />
      {
        stateLength === 0 ? <p> Please enter data </p> :
          <div>
            <h2>Statistics</h2>
            <Statistics statistic={`good`} formula={`good`} good={good} bad={bad} neutral={neutral} />
            <Statistics statistic={`neutral`} formula={`neutral`} good={good} bad={bad} neutral={neutral} />
            <Statistics statistic={`bad`} formula={`bad`} good={good} bad={bad} neutral={neutral} />
            <Statistics statistic={`total`} formula={`total`} good={good} bad={bad} neutral={neutral} />
            <Statistics statistic={`average`} formula={`average`} good={good} bad={bad} neutral={neutral} />
            <Statistics statistic={`positive`} formula={`positive`} good={good} bad={bad} neutral={neutral} />
          </div>
      }
    </>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)

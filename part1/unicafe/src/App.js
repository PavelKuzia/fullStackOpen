import { useState } from 'react'

/*
// functions to display reviews
const showGood = (good) => {
    return (
      <div>
        good {good}
      </div>
    )
}

const showNeutral = (neutral) => {
     return (
       <div>
         neutral {neutral}
       </div>
     )
}

const showBad = (bad) => {
     return (
       <div>
         bad {bad}
       </div>
     )
}

const showAll = (good, neutral, bad) => {
     return (
       <div>
         all {good + neutral + bad}
       </div>
     )
}

// function to calculate average
const showAverage = (good, neutral, bad) => {
    if (good === 0 && neutral === 0 && bad === 0) {
      return <div>0</div>
    }
    return (
      <div>
        average {(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)}
      </div>
    )
}

// function to calculate percent of positive reviews
const showPositive = (good, neutral, bad) => {
     if (good === 0 && neutral === 0 && bad === 0) {
       return <div>0</div>
     }
     return (
      <div>
        positive {(good / (good + neutral + bad)) * 100} %
      </div>
     )
}
*/

const StatisticLine = ({text, value}) => {
  if (text === "good") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  else if (text === "neutral") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  else if (text === "bad") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  else if (text === "all") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  else if (text === "average") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    )
  }
  else if (text === "positive") {
    return (
      <tr>
        <td>{text}</td>
        <td>{value} %</td>
      </tr>
    )
  }
}

const Statistics = ({good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return <div>No feedback given</div>
  }
  return (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)} />
      <StatisticLine text="positive" value={(good / (good + neutral + bad)) * 100} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  return (
    <div>
      <h3>give feedback</h3>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <h3>statistics</h3>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
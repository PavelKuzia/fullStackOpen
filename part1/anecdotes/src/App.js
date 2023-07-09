import { useState } from 'react'
import React from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)
  const [votes, changeVotes] = useState(new Array(anecdotes.length).fill(0))

  const onVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    let i = copy.indexOf(Math.max(...copy))
    setMostVoted(i)
    changeVotes(copy)
  }


  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <div>
        <button onClick={() => onVoteClick()}>vote</button>
        <button onClick={() => setSelected(getRandomInt(0, anecdotes.length))}>next anecdote</button>
        <h2>Anecdote with most votes</h2>
        {anecdotes[mostVoted]}
        <div>has {votes[mostVoted]} votes</div>
      </div>
    </div>
  )
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

export default App
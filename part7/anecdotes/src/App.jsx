import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Menu from './Menu'
import About from './About'
import AnecdoteForm from './AnecdoteForm'
import Footer from './Footer'
import AnecdoteList from './AnecdoteList'
import AppContext from './appContext'
import Anecdote from './Anecdote'
import Notification from './Notification'

const App = () => {
  const initialAnecdotes = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ]
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  const [notification, setNotification] = useState('')

  return (
    <div>
      <h1>Software anecdotes</h1>
      <AppContext.Provider value={[anecdotes, setAnecdotes, notification, setNotification]} >
        <Router>
        <Menu />
        <Notification />
          <Routes>
            <Route path="/anecdotes/:id" element={<Anecdote />} />
            <Route path="/anecdotes" element={<AnecdoteList />} />
            <Route path="/newAnecdote" element={<AnecdoteForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/" element={<AnecdoteList />} />
          </Routes>
        </Router>
        <Footer />
      </AppContext.Provider>
    </div>
  )
}

export default App

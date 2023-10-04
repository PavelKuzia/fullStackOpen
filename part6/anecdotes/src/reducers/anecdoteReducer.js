import store from '../store'
import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
import { createNotification } from './notificationReducer'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteAnecdote(state, action) {
      return state.map(a => a.id !== action.payload.id ? a : action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { voteAnecdote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createNewAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const updateAnecdote = (id) => {
  return async dispatch => {
    const anecdote = store.getState().anecdotes.find(anecdote => anecdote.id === id)
    const newAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    await anecdoteService.updateAnecdote(newAnecdote)
    dispatch(voteAnecdote(newAnecdote))
    const content = [`You voted '${newAnecdote.content}'`, 1]
    dispatch(createNotification(content))
  }
}

export default anecdoteSlice.reducer

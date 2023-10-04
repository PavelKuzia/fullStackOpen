import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote =  newAnecdote => {
    if (newAnecdote.content.length < 5) {
        throw new Error('Anecdote should be at least 5 characters long')
    } else {
        const data = axios.post(baseUrl, newAnecdote).then(result => result.data)
        return data
    }
}

export const updateAnecdote = newAnecdote => {
    const data = { ...newAnecdote, votes: newAnecdote.votes + 1 }
    return axios.put(`${baseUrl}/${newAnecdote.id}`, data).then(result => result.data)
}
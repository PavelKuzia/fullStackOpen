import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getId = () => (100000 * Math.random()).toFixed(0)

export const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

export const createNew = async (content) => {
    const object = { content, id: getId(), votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

export const updateAnecdote = async (content) => {
    const url = baseUrl + '/' + content.id
    const response = await axios.put(url, content)
    return response.data
}

const anecdoteService = { getAll, createNew, updateAnecdote }

export default anecdoteService
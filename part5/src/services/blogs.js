import axios from 'axios'
const baseUrl = '/api/blogs'

let token = ''

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => {
    return response.data
})
}

const create = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newBlog, config)
  const data = await axios.get(baseUrl + '/' + response.data.id)
  return data.data
}

const update = async newBlog => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + newBlog.id
  const response = await axios.put(url, newBlog, config)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  const url = baseUrl + '/' + id
  const response = await axios.delete(url, config)
}

export default {
  getAll,
  create,
  setToken,
  update,
  deleteBlog
}
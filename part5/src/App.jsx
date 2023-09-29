import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateNewBlog from './components/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs => {
      const blogsSorted = blogs.sort((a, b) => b.likes - a.likes)
      setBlogs( blogsSorted )
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addNewBlog = async blogObj => {
    try {
      const response = await blogService.create(blogObj)
      const newBlogsArray = blogs.concat(response)
      const newBlogsArraySorted = newBlogsArray.sort((a, b) => b.likes - a.likes)
      setBlogs(newBlogsArraySorted)
      setMessage('New Blog is created')
      if (blogFormRef.current !== null) blogFormRef.current.toggleVisibility()
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
      setMessage(error.response.data)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      setUser(user)
      setUsername('')
      setPassword('')

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      if (!blogService.token) {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        const user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)        
      }
    } catch (exception) {
      setMessage('Wrong credentials')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setMessage(`${user.name} is logged out`)
    setUser(null)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>

      <h1>Blogs</h1>

      <Notification message={message} />

      { !user && <LoginForm username={username} setUsername={setUsername} password={password} setPassword={setPassword} handleLogin={handleLogin} />       }

      {user &&
        <div>
          <p>{user.name} is logged in<button onClick={handleLogout} id='logout_button'>logout</button></p>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <CreateNewBlog createBlogs={addNewBlog} />
          </Togglable>
          <div id='blogs_div'>
            {blogs.map(blog => <Blog key={ blog.id } blog={ blog } user={ user } blogs={ blogs } setBlogs={setBlogs} />)}
          </div>
        </div>
      }

    </div>
  )
}

export default App
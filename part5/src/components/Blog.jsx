import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [showFullForm, setShowFullForm] = useState(false)
  const [likeState, setLikeState] = useState(blog.likes)
  const displayDeleteButton = {display: blog.user.username === user.username ? '' : 'none'}
  let displayFullForm = { display: showFullForm ? '' : 'none' }
  let buttonLabel = showFullForm ? 'hide' : 'view'

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const setLikes = async () => {
    const newBlog = { ...blog, likes: likeState + 1 }
    const blogsArray = blogs.map(blog => blog.id !== newBlog.id ? blog : newBlog).sort((a, b) => b.likes - a.likes)
    setBlogs(blogsArray)
    setLikeState(likeState + 1)
    await blogService.update(newBlog)
  }

  const deleteBlog = async () => {
    if (window.confirm(`Do you really want to delete ${ blog.title } by ${ blog.author }?`)) {
      await blogService.deleteBlog(blog.id)
      const newBlogs = blogs.filter(b => b.id !== blog.id)
      setBlogs(newBlogs)
    }
  }

  const toggleShowForm = () => {
    setShowFullForm(!showFullForm)
  }

  return (
    <div style={blogStyle} className='blog_class'>
      <div id='mainContent'>
        {blog.title} {blog.author}
        <button onClick={ toggleShowForm } class='showFullInfo'>{buttonLabel}</button>
      </div>
      <div style={displayFullForm} id='additionalContent'>
        <div> {blog.url} </div>
        <div>
          likes {likeState}
          <button onClick={setLikes} className='likesButton'>like</button>
        </div>
        <div> {blog.user.name} </div>
        <button onClick={deleteBlog} style={displayDeleteButton} id='delete_button'>delete</button>
      </div>
    </div>
  )
}

export default Blog
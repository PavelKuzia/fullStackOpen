import { useState } from 'react'

const NewBlog = ({ createBlogs }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleNewForm = async (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
    setTitle('')
    setAuthor('')
    setUrl('')
    createBlogs(newBlog)
  }

  return (
    <form onSubmit={handleNewForm}>
      <div>
        title
        <input
          style={{ marginLeft: 10 }}
          type='text'
          value={title}
          name='Title'
          id='title_input'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          style={{ marginLeft: 10 }}
          type='text'
          value={ author }
          name='Author'
          id='author_input'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input style={{ marginLeft: 10 }}
        type='text'
        value={ url }
        name='URL'
        id='url_input'
        onChange={({ target }) => setUrl(target.value) } />
      </div>
      <button type='submit' id='create_blog_button'>create</button>
    </form>
  )
}

export default NewBlog
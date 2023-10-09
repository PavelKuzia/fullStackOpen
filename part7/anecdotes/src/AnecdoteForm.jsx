import { useContext } from 'react'
import AppContext from './appContext'
import { useField } from './hooks'

const AnecdoteForm = () => {
  const content = useField('content')
	const author = useField('author')
	const info = useField('info')

	const anecdotes = useContext(AppContext)[0]
	const setAnecdotes = useContext(AppContext)[1]
	const setNotification = useContext(AppContext)[3]
    
  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
		setNotification(`A new anecdote ${anecdote.content} created!`)
		setTimeout(() => {
			setNotification('')
		}, 5000)
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
		const newAnecdote = {
			content: content.value,
			author: author.value,
			info: info.value,
			votes: 0
			
		}
    addNew(newAnecdote)
  }

	const resetForm = () => {
		content.reset()
		author.reset()
		info.reset()
	}
  
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name={content.name} value={content.value} onChange={content.onChange} />
        </div>
        <div>
          author
          <input name={author.name} value={author.value} onChange={author.onChange} />
        </div>
        <div>
          url for more info
          <input name={info.name} value={info.value} onChange={info.onChange} />
        </div>
        <button type='submit'>create</button>
				<button onClick={resetForm} type='button'>reset</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
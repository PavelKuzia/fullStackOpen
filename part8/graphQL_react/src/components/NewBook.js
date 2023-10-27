import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const NewBook = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const divStyle = { marginLeft: 6, marginTop: 10 }
  const inputStyle = { marginLeft: 10, width: 200 }
  const genresStyle = { fontWeight: 'normal' }

  const [ createNewBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [  {query: ALL_BOOKS} ]
  })

  const submit = async (event) => {
    event.preventDefault()
    const publishedInt = parseInt(published)
    createNewBook({ variables: { title, author, publishedInt, genres }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div style={divStyle}>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <th>Title</th>
              <th>
                <input
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                  style={inputStyle}
                />
              </th>
            </tr>
            <tr>
              <th>Author</th>
              <th>
                <input
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                  style={inputStyle}
                />
              </th>
            </tr>
            <tr>
              <th>Published</th>
              <th>
                <input
                  type="number"
                  value={published}
                  onChange={({ target }) => setPublished(target.value)}
                  style={inputStyle}
                />
              </th>
            </tr>
            <tr>
              <th>Genres</th>
              <th>
                <input
                  value={genre}
                  onChange={({ target }) => setGenre(target.value)}
                  style={inputStyle}
                />
              </th>
              <th>
                <button onClick={addGenre} type="button">
                  add genre
                </button>
              </th>
            </tr>
          </tbody>
        </table>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
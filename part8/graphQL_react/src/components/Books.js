import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState, useEffect } from 'react'

const Books = () => {
  const [selectedBooks, setSelectedBooks] = useState([])
  const [getBooksByGenre, lazyResult] = useLazyQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      setSelectedBooks(data.allBooks)
    },
    fetchPolicy: 'no-cache'
  })

  const result = useQuery(ALL_BOOKS)

  const divStyle = { marginLeft: 6 }

  useEffect(() => {
    if ( result.data ) {
      setSelectedBooks(books)
    }
  }, [result.data])

  if (result.loading) {
    return <div>loading...</div>
  }

  /*
  const setFilter = (value) => {
    if (value === 'all') {
      setSelectedBooks(books)
    } else {
      const newSelectedBooks = books.filter(b => b.genres.includes(value))
      setSelectedBooks(newSelectedBooks)
    }
  }
  */

  const setFilter = (value) => {
    if (value === 'all') {
      setSelectedBooks(books)
    } else {
      getBooksByGenre({variables: {genre: value}})
    }
  }

  const books = result.data.allBooks
  const allGenres = Array.from(new Set(books.reduce((a, c) => a.concat(c.genres), []).concat('all')))

  return (
    <div style={divStyle}>
      <h2>BOOKS</h2>

      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {selectedBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {allGenres.map((g, i) => (
        <button key={i} value={g} onClick={() => setFilter(g)}>{g}</button>
      ))}
    </div>
  )
}

export default Books

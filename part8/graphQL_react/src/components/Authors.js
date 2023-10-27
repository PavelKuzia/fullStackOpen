import { useQuery } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_AUTHORS } from '../queries'
import SetBirthYear from './BirthYear'

const Authors = () => {
  const result = useQuery(ALL_AUTHORS)
  const divStyle = { marginLeft: 6 }
  
  const [authorToken, setAuthorToken] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('user-token')
		if (token) {
			setAuthorToken(token)
		}
  }, [])

  if (result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div style={divStyle}>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {authorToken && <SetBirthYear authorNames={ authors.map(a => a.name) }/>}
    </div>
  )
}

export default Authors

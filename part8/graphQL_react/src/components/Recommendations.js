import { ME, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommendation = () => {
	const divStyle = { marginLeft: 6 }
	const resultMe = useQuery(ME)
	const resultAll = useQuery(ALL_BOOKS)

	if (resultAll.loading || resultMe.loading) {
		return <div>Loading...</div>
	}

	const books = resultAll.data.allBooks.filter(b => b.genres.includes(resultMe.data.me.favoriteGenre))

  return (
    <div style={divStyle}>
      <h2>RECOMMENDATIONS</h2>
			<div>Books in Your favorite genre <b>{resultMe.data.me.favoriteGenre}</b></div>
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendation
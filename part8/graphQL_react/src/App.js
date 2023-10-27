import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import Logout from './components/Logout'
import Recommendation from './components/Recommendations'
// import Notify from './components/Notify'

const App = () => {
	const buttonStyle = {
    padding: 5,
		fontSize: 25,
		marginRight: "0.05rem",
  	textDecoration: "none",
  	color: "black"
  }

	const [token, setToken] = useState(null)
	const [errorMessage, setErrorMessage] = useState('')

	useEffect(() => {
		const token = localStorage.getItem('user-token')
		if (token) {
			setToken(token)
		}
	}, [])
 
  return (
		<Router>
			<div>
				<Link style={buttonStyle} to={ "/authors" } >Authors</Link>
				<Link style={buttonStyle} to={ "/books" } >Books</Link>
				{token && <Link style={buttonStyle} to={ "/addbook" } >Add Book</Link>}
				{token && <Link style={buttonStyle} to={ "/recommendations" } >Recommendations</Link>}
				{token && <Link style={buttonStyle} to={ "/logout" } >Logout</Link>}
				{!token && <Link style={buttonStyle} to={ "/login" } >Login</Link>}
			</div>

			<Routes>
				<Route path="/" element={<Authors />} />
        <Route path="/authors" element={<Authors />} />
        <Route path="/books" element={<Books />} />
				<Route path="/addbook" element={<NewBook />} />
				<Route path="/recommendations" element={<Recommendation />} />
				<Route path="/login" element={<LoginForm setToken={setToken} setError={setErrorMessage} />} />
				<Route path="/logout" element={<Logout setToken={setToken}/>} />
      </Routes>
		</Router>
  )
}

export default App

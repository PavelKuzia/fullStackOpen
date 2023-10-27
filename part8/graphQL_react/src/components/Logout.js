import { useNavigate } from 'react-router-dom'
import { useApolloClient } from '@apollo/client'
import { useEffect } from 'react'

const Logout = ({setToken}) => {
	const client = useApolloClient()
	const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
		navigate('/')
  }

	useEffect(() => {
		logout()
	}, [])

	return null
}

export default Logout
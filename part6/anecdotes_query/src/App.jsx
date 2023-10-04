import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from 'react'
import NotificationContext from './AppContext'
import { getAnecdotes, updateAnecdote } from '../requests'

const App = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const queryClient  = useQueryClient()
  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      const newAnecdotes = anecdotes.map((element) => element.id === newAnecdote.id ? newAnecdote : element)
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, newAnecdotes)
      const message = `You voted ${newAnecdote.content}`
      dispatch({ type: "SET", payload: message })
      setTimeout(() => {
        dispatch({ type: "RESET" })
      }, 5000)
    }
  })
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote)
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  if (result.error) {
    return <div>anecdote service is not avaialble due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App

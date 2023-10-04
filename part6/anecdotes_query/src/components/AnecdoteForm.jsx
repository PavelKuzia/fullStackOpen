import { createAnecdote } from "../../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useContext } from "react"
import NotificationContext from "../AppContext"

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  const getId = () => (100000 * Math.random()).toFixed(0)
  const queryClient  = useQueryClient()
  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData({ queryKey: ['anecdotes'] })
      queryClient.setQueryData({ queryKey: ['anecdotes'] }, anecdotes.concat(newAnecdote))
      const message = `${newAnecdote.content} added`
      dispatch({ type: "SET", payload: message })
      setTimeout(() => {
        dispatch({ type: "RESET" })
      }, 5000)
    },
    onError: (error) => {
      dispatch({ type: "SET", payload: error.message })
      setTimeout(() => {
        dispatch({ type: "RESET" })
      }, 5000)
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = { content, id: getId(), votes: 0 }
    newAnecdoteMutation.mutate(newAnecdote)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm

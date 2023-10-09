import { useParams } from "react-router-dom"
import { useContext } from "react"
import AppContext from "./appContext"

const Anecdote = () => {
	const anecdotes = useContext(AppContext)[0]
  const id = useParams().id
	const anecdote = anecdotes.find(e => e.id === Number(id))
	return (
    <div>
      <h3>{anecdote.content} by { anecdote.author }</h3>
			<div>has { anecdote.votes } votes</div>
			<div>For more info see: { anecdote.info }</div>
    </div>
  )
}

export default Anecdote
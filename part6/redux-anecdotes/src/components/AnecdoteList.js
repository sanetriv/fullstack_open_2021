import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { clearNoti, setNoti } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, vote }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)
  const dispatch = useDispatch()
  const clickVote = (anecdote) => {
    dispatch(voteFor(anecdote.id))
    dispatch(setNoti(`you voted '${anecdote.content}'`))
    setTimeout(() => dispatch(clearNoti()),5000)
  }
  return (
    <ul>
      {filter.length>0 ? anecdotes.filter(a => a.content.toLowerCase().includes(filter.toLowerCase())).sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => clickVote(anecdote)}/>
      ):
      anecdotes.sort((a,b) => b.votes - a.votes).map(anecdote =>
        <Anecdote key={anecdote.id} anecdote={anecdote} vote={() => clickVote(anecdote)}/>
      )}
    </ul>
  )
}

export default AnecdoteList
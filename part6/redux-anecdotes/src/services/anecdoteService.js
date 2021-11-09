import axios from 'axios'
import { asObject } from '../reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addAnecdote = async (anecdote) => {
  const obj = asObject(anecdote)
  const response = await axios.post(baseUrl, obj)
  return response.data
}

const vote = async (anecdote) => {
  const obj = {...anecdote, votes: anecdote.votes+1}
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, obj)
  return response.data
}

export default { getAll, addAnecdote, vote }
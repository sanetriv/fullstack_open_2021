import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getForUser = async () => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.get(baseUrl, config)
  console.log(response.data)
  return response.data
}

const createNewBlog = async (title, author, url) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, { title: title, author: author, url: url }, config)
  return response.data
}

const updateLikes = async ({ user, title, author, url, likes, id }) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.put(`${baseUrl}/${id}`,
    { title: title, author: author, url: url, user: user, likes: likes },
    config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${blog.id.toString()}`, config)
  return response.data
}

export default { getAll, setToken, getForUser, createNewBlog, updateLikes, deleteBlog }
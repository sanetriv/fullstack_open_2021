import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/Newblogform'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage(
        'Invalid username or password'
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  const createBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      const result = await blogService.createNewBlog(title, author, url)
      setBlogs(await blogService.getAll())
      setMessage(
        `a new blog ${result.title} ${result.author} added`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception){
      return
    }
  }

  const updateLikes = async (blogToUpdate) => {
    try{
      await blogService.updateLikes(blogToUpdate)
      setBlogs(await blogService.getAll())
    }catch(exception){
      return
    }
  }

  const deleteBlog = async (blog) => {
    try{
      const del = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
      if(del){
        const result = await blogService.deleteBlog(blog)
        console.log(result)
        setBlogs(await blogService.getAll())
      }
      //window.alert('You can\'t remove other people\'s blogs')
    }catch(exception){
      return
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification message={message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{user.name} logged-in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
        <NewBlogForm createBlog={createBlog} />
      </Togglable>
      <Notification message={message} />
      {blogs.sort(function (a,b) { return b.likes-a.likes }).map(blog =>
        <Blog key={blog.id} blog={blog} updateLikes={updateLikes} deleteBlog={deleteBlog} user={user}/>
      )}
    </div>
  )

}

export default App
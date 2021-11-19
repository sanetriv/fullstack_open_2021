import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import NewBlogForm from './components/Newblogform'
import Togglable from './components/Togglable'
import { setNoti } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog, initBlogs } from './reducers/blogReducer'
import { logoutUser, setUser } from './reducers/userReducer'
import Bloglist from './components/Bloglist'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'
import Userlist from './components/Userlist'
import { initUsers } from './reducers/usersReducer'
import User from './components/User'
import Blogdetails from './components/Blogdetails'
import './App.css'
import { Button, Layout, Menu } from 'antd'
import Home from './components/Home'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { Header, Content, Footer } = Layout
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
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
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNoti('Invalid username or password', 5))
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    dispatch(logoutUser())
    setUsername('')
    setPassword('')
    blogService.setToken(null)
  }

  const addBlog = async (title, author, url) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(createBlog(title, author, url))
      dispatch(setNoti(`a new blog ${title} ${author} added`,5))
    } catch (exception){
      return
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          id='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          id='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id='login_button'>login</button>
    </form>
  )

  const user = useSelector(state => state.user)

  if (user === null) {
    return (
      <div>
        <h1>Login to application</h1>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  const padding = { padding: 5 }

  return (
    <div className='App'>
      <Layout className="layout">
        <Router>
          <Header>
            <Menu theme="dark" mode="horizontal">
              {[<Menu.Item key='1'><Link style={padding} to='/'>home</Link></Menu.Item>,
                <Menu.Item key='2'><Link style={padding} to='/blogs'>blogs</Link></Menu.Item>,
                <Menu.Item key='3'><Link style={padding} to='/users'>users</Link></Menu.Item>,
                user
                  ? null
                  : <Menu.Item key='4'><Link style={padding} to='/login'>login</Link></Menu.Item>
              ]}
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px' }}>
            <p>{user.name} logged in <Button onClick={handleLogout} id='logoutButton'>logout</Button></p>
            <Routes>
              <Route path='/blogs/:id' element={<Blogdetails />} />
              <Route path='/users' element={<Userlist />} />
              <Route path='/users/:id' element={<User />} />
              <Route path='/blogs' element=
                {<div>
                  <h2>Blogs</h2>
                  <Togglable buttonLabel='Create new blog' ref={blogFormRef}>
                    <NewBlogForm createBlog={addBlog} />
                  </Togglable>
                  <Notification />
                  <Bloglist/>
                </div>} />
              <Route path='/' element={<Home />} />
            </Routes>
          </Content>
        </Router>
        <Footer style={{ textAlign: 'center' }}>Blog app</Footer>
      </Layout>
    </div>
  )

}

export default App
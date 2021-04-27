import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import userService from './services/users'
import blogService from './services/blogs'

import NoteForm from './components/NoteForm'
import Togglable from './components/Togglable'

const App = () => {

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [mes, setMes] = useState('')
  const blogFormRef = useRef()

  const newArr = blogs.sort((a, b) => {
    return b.likes - a.likes
  })

  const handleLogin = async () => {
    const userNew = {
      username: username,
      password: password
    }
    try {
      const res = await loginService.login(userNew)
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(res)
      )
      setUser(res)
    } catch (e) {
      const err = e.response.data.error
      setMes(err)
      setTimeout(() => {
        setMes('')
      }, 3000)
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVis()
    blogService.setToken(user.token)
    const res = await blogService.create(newBlog)
    let oldBlog = blogs
    let newBlogs = oldBlog.concat(res)
    setBlogs(newBlogs)
  }

  const getUserBlogs = async () => {
    const userBlogs = await userService.getUser(user.userId)
    if (userBlogs === null) {

    }
    else { setBlogs(userBlogs.blogs) }
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const handleDelete = async deleteThis => {
    blogService.setToken(user.token)
    const res = await blogService.remove(deleteThis)
    getUserBlogs()
  }

  useEffect(() => {
    if (user !== null) {
      getUserBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedOnJSON = window.localStorage.getItem('loggedUser')
    if (typeof loggedOnJSON === 'undefined') {
      /* empty */
    }
    else if (loggedOnJSON) {
      const user = JSON.parse(loggedOnJSON)
      setUser(user)
    }
  }, [])


  return (
    <div>
      <h1>Login</h1>
      <div
        id='LoginForm'>
        <input
          id='username'
          text='Username'
          onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div><input
        id='password'
        text='Password'
        onChange={({ target }) => setPassword(target.value)}
      /></div>
      <button id='loginButton' onClick={handleLogin}>Login</button>
      <span>{mes}</span>
      {user === null ?
        null : <div>
          <h2>Blogs</h2>
          <h3>User:{user.username}</h3>
          <button onClick={logoutHandler}>Logout</button>
          <ul
            id='blogsArray'>
            {
              newArr.map(blog => <li>
                <Blog key={blog.id} blog={blog} user={user} handleDelete={handleDelete} /></li>
              )}
          </ul>
          <Togglable buttonLable={'Create Form'} ref={blogFormRef}>
            <NoteForm user={user} handleBlogSubmit={addBlog} />
          </Togglable>
        </div>}
    </div>
  )
}

export default App
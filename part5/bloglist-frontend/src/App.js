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
      console.log(e.response);
    }
  }

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVis()
    blogService.setToken(user.token)
    const res = await blogService.create(newBlog)
    console.log(res);
  }

  const getUserBlogs = async () => {
    const userBlogs = await userService.getUser(user.userId)
    setBlogs(userBlogs.blogs)
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
  }


  useEffect(() => {
    if (user !== null) {
      getUserBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedOnJSON = window.localStorage.getItem('loggedUser')
    if (typeof loggedOnJSON === 'undefined') {

    } else if (loggedOnJSON) {
      const user = JSON.parse(loggedOnJSON)
      setUser(user)
    }
  }, [])


  return (
    <div>
      <h1>Login</h1>
      <div><input
        text='Username'
        onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div><input
        text='Password'
        onChange={({ target }) => setPassword(target.value)}
      /></div>
      <button onClick={handleLogin}>Login</button>
      {user === null ?
        null : <div>
          <h2>Blogs</h2>
          <h3>User:{user.username}</h3>
          <button onClick={logoutHandler}>Logout</button>
          {
            newArr.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )}
          <Togglable buttonLable={'Create Form'} ref={blogFormRef}>
            <NoteForm user={user} handleBlogSubmit={addBlog} />
          </Togglable>

        </div>}
    </div>
  )
}

export default App
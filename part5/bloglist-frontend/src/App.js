import axios from 'axios'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'

const App = () => {

  const [blogs, setBlogs] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleLogin = async () => {
    const userNew = {
      username: username,
      password: password
    }
    const res = await loginService.login(userNew)
    window.localStorage.setItem(
      'loggedUser', JSON.stringify(res)
    )
    setUser(res)
  }

  const getUserBlogs = async () => {
    const userBlogs = await userService.getUser(user.userId)
    setBlogs(userBlogs.blogs)
  }

  const logoutHandler = () => {
    window.localStorage.removeItem('loggedUser')
  }

  const handleBlogSubmit = async () => {
    const newBlog = {
      "title": blogTitle,
      "author": blogAuthor,
      "url": blogUrl
    }
    blogService.setToken(user.token)
    const res = await blogService.create(newBlog)
    console.log(res);
  }

  useEffect(() => {
    if (user !== null) {
      getUserBlogs()
    }
  }, [user])

  useEffect(() => {
    const loggedOnJSON = window.localStorage.getItem('loggedUser')
    if (loggedOnJSON) {
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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
          <h2>Create new</h2>
          <p>Title:</p><input
            onChange={({ target }) => setBlogTitle(target.value)}
          ></input>
          <p>Author:</p><input
            onChange={({ target }) => setBlogAuthor(target.value)}
          ></input>
          <p>URL:</p> <input
            onChange={({ target }) => setBlogUrl(target.value)}
          ></input>
          <button onClick={handleBlogSubmit}>Submit</button>
        </div>}
    </div>
  )
}

export default App
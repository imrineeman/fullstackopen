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

  const handleLogin = async () => {
    const userNew = {
      username: username,
      password: password
    }
    const res = await loginService.login(userNew)
    setUser(res)

  }

  const getUserBlogs = async () => {
    const userBlogs = await userService.getUser(user.userId)
    setBlogs(userBlogs.blogs)
  }

  useEffect(() => {
    if (user !== null) {
      getUserBlogs()
    }
  }, [user])

  useEffect(() => {
    console.log(blogs);
  }, [blogs])

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
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
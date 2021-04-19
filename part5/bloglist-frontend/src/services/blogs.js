import axios from 'axios'
const baseUrl = 'http://localhost:3005/api/blogs'


let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newBlog => {
  const conf = {
    headers: { Authorization: token },
  }

  const res = await axios.post(baseUrl, newBlog, conf)
  return res.data
}

const update = async (blog) => {

  const url = baseUrl + '/' + String(blog.id)

  const res = await axios.put(url, blog)
  return res.data
}

export default { getAll, create, setToken, update }
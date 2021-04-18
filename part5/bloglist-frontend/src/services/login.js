import axios from 'axios'

const baseUrl = 'http://localhost:3005/api/login'

const login = async cred => {
    const res = await axios.post(baseUrl, cred)
    return res.data
}

export default { login }

import axios from 'axios'

const baseUrl = 'http://localhost:3005/api/users/'

const getUser = async id => {
    const res = await axios.get(baseUrl + String(id))
    return res.data
}

export default { getUser }

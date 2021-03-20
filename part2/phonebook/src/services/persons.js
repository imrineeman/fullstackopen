import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const get = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newPerson => {
    const req = axios.post(baseUrl, newPerson)
    return req.then(res => res.data)
}

const remove = id => {
    return axios.delete(baseUrl + `/${id}`)
}


export default { create, get, remove }


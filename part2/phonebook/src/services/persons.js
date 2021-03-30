import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

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

const update = (id, newObj) => {
    return axios.put(baseUrl + `/${id}`, newObj)
}

export default { create, get, remove, update }


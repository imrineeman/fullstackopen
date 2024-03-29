import axios from 'axios'

const baseUrl = '/api/persons'

const get = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = newPerson => {
    return axios.post(baseUrl, newPerson)
}

const remove = id => {
    return axios.delete(baseUrl + `/${id}`)
}

const update = (id, newObj) => {
    return axios.put(baseUrl + `/${id}`, newObj)
}

export default { create, get, remove, update }


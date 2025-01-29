import axios from 'axios'

let api = axios.create({
    baseURL: 'http://localhost:4000'
})

export const postURL = (input) => api.post('/shorten', { OriginalUrl: input })

let apis = { postURL }

export default apis
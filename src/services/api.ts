import axios from 'axios';

const api = axios.create({
    //URLBASE
    baseURL: 'http://localhost:3333'
})

export default api;
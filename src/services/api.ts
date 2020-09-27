import axios from 'axios';

const api = axios.create({
    //URLBASE
    baseURL: 'http://piupiuwer.polijr.com.br/'
})

export default api;
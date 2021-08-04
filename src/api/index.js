  
import axios from 'axios'

const api = axios.create({
    // baseURL:  'http://localhost:5000/api/',
    baseURL:  'https://checkonline.in/api/',

})

export default api;
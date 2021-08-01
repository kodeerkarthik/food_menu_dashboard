  
import axios from 'axios'

const api = axios.create({
    baseURL:  'http://localhost:5000/api/',
    // baseURL:  'http://checkonline.in/api/',

})

export default api;
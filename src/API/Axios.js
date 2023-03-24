import axios from 'axios';

/* Poniendo como default la URL del servidor de desarrollo */
export default axios.create({
    baseURL: 'http://168.232.50.16/v1/',
});
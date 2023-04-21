import axios from 'axios';
import { getCurrentUser } from '../Funciones/user';

const BASE_URL = 'http://168.232.50.15/v1/'

/* Poniendo como default la URL del servidor de desarrollo */
export default axios.create({
    baseURL: BASE_URL,
});
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://localhost:7013'
});

export default instance;
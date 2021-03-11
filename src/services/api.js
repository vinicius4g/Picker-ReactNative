import axios from 'axios';

const api = axios.create({
    baseURL: 'https://viacep.com.br/ws',
    urlUF: 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
})

export default api;
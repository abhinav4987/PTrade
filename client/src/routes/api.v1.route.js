const axios = require('axios');


const apiV1Request = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
})


export default apiV1Request;
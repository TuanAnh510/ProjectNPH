import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: `https://cdn.jsdelivr.net`,
    timeout: 500000,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',

    },


});

const responseBody = (response) => response.data;

const requests2 = {
    get: (url, body) => instance.get(url, body).then(responseBody),

    post: (url, body, headers) =>
        instance.post(url, body, headers).then(responseBody),

    put: (url, body) => instance.put(url, body).then(responseBody),
};

export default requests2;

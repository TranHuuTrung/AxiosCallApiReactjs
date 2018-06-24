import axios from 'axios';

// cai nay co the de dung khi cac component import no thi co the thay doi URL den cac API khac nhau
const instance = axios.create({
    baseURL: 'http://jsonplaceholder.typicode.com'
});

instance.defaults.headers.common['Authrization'] = 'AUTH TOKEN INSTANCE';

export default instance;
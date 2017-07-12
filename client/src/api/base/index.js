import axios from 'axios';

import config from '../../env/config';

const api = () => (
  axios.create({
    baseURL: config.host,
    headers: { 'Content-Type': 'application/json' }
  })
);

export default api
import axios from 'axios';

import config from '../../env/config';

const api = () => (
  axios.create({
    baseURL: config.host
  })
);

export default api
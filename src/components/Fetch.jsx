const axios = require('axios');

const AUTH_HEADERS = {
  Authorization: 'hawaijar',
};
const URL = 'http://localhost:5001';

export default function getAllCategories() {
  const url = `${URL}/categories`;
  return axios
    .get(url, { headers: AUTH_HEADERS })
    .then(res => res.data)
    .catch(err => console.log(err));
}

const prefix = '/rest';

function _get(url, options) {
  return fetch(`${prefix}${url}`, options)
    .then(response => response.json());
}

const api = {
  get: _get
};

export default api;

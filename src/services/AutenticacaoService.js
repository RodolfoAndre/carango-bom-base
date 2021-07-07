const baseUrl = 'http://localhost:8080/auth';

const headers = new Headers({
  'Content-Type': 'application/json',
  Authorization: 'Bearer ',
});

const AutenticacaoService = {
  autenticar(usuario) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(usuario),
    }).then((response) => response.json());
  },
};

export default AutenticacaoService;

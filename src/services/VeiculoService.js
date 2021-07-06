import { TOKEN_KEY } from '../Constants';

const baseUrl = 'http://localhost:8080/veiculos';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  });

const VeiculoService = {
  listar() {
    return fetch(baseUrl, { headers: headers() }).then((response) =>
      response.json()
    );
  },

  consultar(id) {
    return fetch(`${baseUrl}/${id}`, { headers: headers() }).then((response) =>
      response.json()
    );
  },

  cadastrar(veiculo) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(veiculo),
    }).then((response) => response.json());
  },

  alterar(veiculo) {
    return fetch(`${baseUrl}/${veiculo.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(veiculo),
    }).then((response) => response.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}/${veiculo.id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then((response) => response.json());
  },
};

export default VeiculoService;

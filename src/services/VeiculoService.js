const baseUrl = 'https://carango-bom-api.herokuapp.com/veiculos/';

const headers = new Headers({ 'Content-Type': 'application/json' });

const VeiculoService = {
  listar() {
    return fetch(baseUrl).then((response) => response.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}${id}`).then((response) => response.json());
  },

  cadastrar(veiculo) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(veiculo),
    }).then((response) => response.json());
  },

  alterar(veiculo) {
    return fetch(`${baseUrl}${veiculo.id}`, {
      method: 'PUT',
      headers: headers,
      body: JSON.stringify(veiculo),
    }).then((response) => response.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}${veiculo.id}`, {
      method: 'DELETE',
      headers: headers,
    }).then((response) => response.json());
  },
};

export default VeiculoService;

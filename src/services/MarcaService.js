import { TOKEN_KEY } from '../Constants';

const baseUrl = 'http://localhost:8080/marcas';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  });

const MarcaService = {
  cadastrar(marca) {
    delete marca.id;
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(marca),
    }).then((response) => response.json());
  },

  alterar(marca) {
    return fetch(`${baseUrl}/${marca.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(marca),
    }).then((response) => response.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}/${id}`, { headers: headers() }).then((response) =>
      response.json()
    );
  },

  listar() {
    return fetch(baseUrl, { headers: headers() }).then((response) =>
      response.json()
    );
  },

  excluir(marca) {
    return fetch(`${baseUrl}/${marca.id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then((response) => response.json());
  },
};

export default MarcaService;

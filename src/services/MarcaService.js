import { TOKEN_KEY } from '../Constants';

const baseUrl = 'https://carango-bom-withfliters.herokuapp.com/marcas';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    'X-XSRF-TOKEN': '',
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
    const reqHeaders = headers();
    reqHeaders.delete('X-XSRF-TOKEN');
    return fetch(`${baseUrl}/${id}`, { headers: reqHeaders }).then((response) =>
      response.json()
    );
  },

  listar() {
    const reqHeaders = headers();
    reqHeaders.delete('X-XSRF-TOKEN');
    return fetch(baseUrl, { headers: reqHeaders }).then((response) =>
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

import { TOKEN_KEY } from '../Constants';
import CookiesUtils from "../utils/CookiesUtils";

const baseUrl = 'https://carango-bom-withfliters.herokuapp.com/marcas';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    'X-XSRF-TOKEN': CookiesUtils.getCookie('XSRF-TOKEN')
  });

const MarcaService = {
  cadastrar(marca) {
    delete marca.id;
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(marca),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },

  alterar(marca) {
    return fetch(`${baseUrl}/${marca.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(marca),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },

  consultar(id) {
    const reqHeaders = headers();
    reqHeaders.delete('X-XSRF-TOKEN');
    return fetch(`${baseUrl}/${id}`, { headers: reqHeaders, withCredentials: true, credentials : 'include' }).then((response) =>
      response.json()
    );
  },

  listar() {
    const reqHeaders = headers();
    reqHeaders.delete('X-XSRF-TOKEN');
    return fetch(baseUrl, { headers: reqHeaders, withCredentials: true, credentials : 'include' }).then((response) =>
      response.json()
    );
  },

  excluir(marca) {
    return fetch(`${baseUrl}/${marca.id}`, {
      method: 'DELETE',
      headers: headers(),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },
};

export default MarcaService;

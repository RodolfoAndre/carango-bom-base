import { TOKEN_KEY } from '../Constants';
import CookiesUtils from "../utils/CookiesUtils";

const baseUrl = 'https://carango-bom-withfliters.herokuapp.com/veiculos';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    'X-XSRF-TOKEN': CookiesUtils.getCookie('XSRF-TOKEN'),
    'Access-Control-Allow-Origin': 'true'
  });

const VeiculoService = {
  listar() {
    const reqHeaders = headers();
    reqHeaders.delete('X-XSRF-TOKEN');
    return fetch(baseUrl, { headers: reqHeaders, withCredentials: true, credentials : 'include' }).then((response) =>
      response.json()
    );
  },

  filtrar(filtro) {
    return fetch(`${baseUrl}/filtro`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(filtro),
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

  cadastrar(veiculo) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(veiculo),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },

  alterar(veiculo) {
    return fetch(`${baseUrl}/${veiculo.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(veiculo),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },

  excluir(veiculo) {
    return fetch(`${baseUrl}/${veiculo.id}`, {
      method: 'DELETE',
      headers: headers(),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },
};

export default VeiculoService;

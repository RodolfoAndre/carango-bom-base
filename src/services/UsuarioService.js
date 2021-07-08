import { TOKEN_KEY } from '../Constants';

const baseUrl = 'http://localhost:8080/usuarios';
const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  });
const UsuarioService = {
  listar() {
    return fetch(baseUrl, { headers: headers() }).then((response) =>
      response.json()
    );
  },

  cadastrar(usuario) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(usuario),
    }).then((response) => response.json());
  },

  alterarSenha(usuario) {
    return fetch(`${baseUrl}/${usuario.id}`, {
      method: 'PUT',
      headers: headers(),
      body: JSON.stringify(usuario),
    }).then((response) => response.json());
  },

  excluir(usuario) {
    return fetch(`${baseUrl}/${usuario.id}`, {
      method: 'DELETE',
      headers: headers(),
    }).then((response) => response.json());
  },
};

export default UsuarioService;

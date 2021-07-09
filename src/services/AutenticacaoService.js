import CookiesUtils from "../utils/CookiesUtils";

const baseUrl = 'https://carango-bom-withfliters.herokuapp.com/auth';

const headers = new Headers({
  'Content-Type': 'application/json',
  'Authorization': 'Bearer ',
  'X-XSRF-TOKEN': CookiesUtils.getCookie('XSRF-TOKEN')
});

const AutenticacaoService = {
  autenticar(usuario) {
    return fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(usuario),
      withCredentials: true,
      credentials : 'include'
    }).then((response) => response.json());
  },
};

export default AutenticacaoService;

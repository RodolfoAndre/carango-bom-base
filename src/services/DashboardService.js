import { TOKEN_KEY } from '../Constants';
import CookiesUtils from "../utils/CookiesUtils";
const baseUrl =
  'https://carango-bom-withfliters.herokuapp.com/veiculos/dashboard';

const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
    'X-XSRF-TOKEN': CookiesUtils.getCookie('XSRF-TOKEN')
  });

const DashboardService = {
  listar() {
    return fetch(baseUrl, { headers: headers(), withCredentials: true, credentials : 'include' }).then((response) =>
      response.json()
    );
  },
};

export default DashboardService;

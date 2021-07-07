import { TOKEN_KEY } from '../Constants';
const baseUrl = 'http://localhost:8080/veiculos/dashboard';

const headers = () =>
  new Headers({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem(TOKEN_KEY)}`,
  });

const DashboardService = {
  listar() {
    return fetch(baseUrl, { headers: headers() }).then((response) =>
      response.json(),
    );
  },
};

export default DashboardService;

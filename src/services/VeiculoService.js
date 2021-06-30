const baseUrl = 'https://carango-bom-api.herokuapp.com/veiculos';

const VeiculoService = {
  listar() {
    return fetch(baseUrl).then((response) => response.json());
  },

  consultar(id) {
    return fetch(`${baseUrl}${id}`).then((response) => response.json());
  },

  excluir(veiculo) {
    console.log(veiculo?.id);
  },
};

export default VeiculoService;

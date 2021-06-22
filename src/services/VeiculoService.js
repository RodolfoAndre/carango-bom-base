const VeiculoService = {
  listar() {
    return fetch('https://carango-bom-api.herokuapp.com/veiculos').then((r) =>
      r.json(),
    );
  },

  excluir(veiculo) {
    console.log(veiculo?.id);
  },
};

export default VeiculoService;

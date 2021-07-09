const ValidacoesVeiculo = {
  marca: (dado) => {
    return avaliarEntradasTexto('Marca', dado);
  },
  modelo: (dado) => {
    return avaliarEntradasTexto('Modelo', dado);
  },
  ano: (dado) => {
    return avaliarEntradaAno(dado);
  },
  valor: (dado) => {
    return avaliarEntradaNumero(dado);
  },
};

const avaliarCampoObrigatorio = (dado) => {
  return !dado || !dado.length;
};

const avaliarEntradasTexto = (nome, dado) => {
  if (avaliarCampoObrigatorio(dado))
    return { valido: false, texto: 'Campo obrigatório' };
  if (dado.length < 2)
    return { valido: false, texto: `${nome} deve ter ao menos 2 letras` };
  return { valido: true };
};

const avaliarEntradaAno = (dado) => {
  if (avaliarCampoObrigatorio(dado))
    return { valido: false, texto: 'Campo obrigatório' };
  if (dado.length != 4 || isNaN(dado))
    return { valido: false, texto: 'Ano deve ter 4 números' };
  return { valido: true };
};

const avaliarEntradaNumero = (dado) => {
  if (avaliarCampoObrigatorio(dado))
    return { valido: false, texto: 'Campo obrigatório' };
  if (isNaN(dado)) return { valido: false, texto: 'Valor deve ser numérico' };
  if (parseInt(dado) <= 0)
    return { valido: false, texto: 'Valor deve ser maior que zero' };
  return { valido: true };
};

export default ValidacoesVeiculo;

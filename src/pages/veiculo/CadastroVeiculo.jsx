import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Typography, TextField, MenuItem } from '@material-ui/core';

import { ActionsToolbar, ActionButton } from '../../assets/GlobalStyles.jsx';

import useErros from '../../hooks/useErros';
import VeiculoService from '../../services/VeiculoService';
import MarcaService from '../../services/MarcaService.js';

const CadastroVeiculo = () => {
  const [veiculo, setVeiculo] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [valor, setValor] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras' };
      return { valido: true };
    },
    modelo: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Modelo deve ter ao menos 3 letras' };
      return { valido: true };
    },
    ano: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Ano deve ter ao menos 3 letras' };
      return { valido: true };
    },
    valor: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Valor deve ter ao menos 3 letras' };
      return { valido: true };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  useEffect(() => {
    MarcaService.listar().then((dado) => setMarcas(dado));

    if (id) {
      VeiculoService.consultar(id).then(
        ({ marca: { nome: nomeMarca }, modelo, ano, valor }) => {
          setMarcaSelecionada(nomeMarca);
          setModelo(modelo);
          setAno(ano);
          setValor(valor);
        },
      );
    }
  }, [id]);

  const cancelar = () => history.goBack();

  const cadastrarVeiculo = () => {
    VeiculoService.cadastrar(veiculo).then(() => {
      history.goBack();
    });
  };

  const alterarVeiculo = () => {
    VeiculoService.alterar(veiculo).then(() => {
      history.goBack();
    });
  };

  const cadastrarOuAlterarVeiculo = (event) => {
    event.preventDefault();

    if (!possoEnviar()) return;

    setVeiculo({ marca: marcaSelecionada, modelo, ano, valor });
    if (id) alterarVeiculo();
    else cadastrarVeiculo();
  };

  const renderizarMarcas = () =>
    marcas.map((marca) => (
      <MenuItem value={marca.nome} key={marca.id}>
        {marca.nome}
      </MenuItem>
    ));

  return (
    <>
      <Typography component='h2' variant='h4'>
        {id ? 'Alterar veículo' : 'Cadastrar veículo'}
      </Typography>
      <form onSubmit={(event) => cadastrarOuAlterarVeiculo(event)}>
        <TextField
          value={marcaSelecionada}
          onChange={(evt) => setMarcaSelecionada(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name='marca'
          id='marca'
          data-testid='marca'
          label='Marca'
          variant='outlined'
          fullWidth
          required
          select
          margin='normal'
        >
          <MenuItem value=''>
            <em>Selecione uma marca</em>
          </MenuItem>
          {renderizarMarcas()}
        </TextField>

        <TextField
          value={modelo}
          onChange={(evt) => setModelo(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.modelo.texto}
          error={!erros.modelo.valido}
          name='modelo'
          id='modelo'
          data-testid='modelo'
          label='Modelo'
          type='text'
          variant='outlined'
          fullWidth
          required
          margin='normal'
        />

        <TextField
          value={ano}
          onChange={(evt) => setAno(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.ano.texto}
          error={!erros.ano.valido}
          name='ano'
          id='ano'
          data-testid='ano'
          label='Ano'
          type='text'
          variant='outlined'
          fullWidth
          required
          margin='normal'
        />

        <TextField
          value={valor}
          onChange={(evt) => setValor(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.valor.texto}
          error={!erros.valor.valido}
          name='valor'
          id='valor'
          data-testid='valor'
          label='Valor'
          type='text'
          variant='outlined'
          fullWidth
          required
          margin='normal'
        />

        <ActionsToolbar>
          <ActionButton
            variant='contained'
            color='secondary'
            onClick={cancelar}
          >
            Cancelar
          </ActionButton>
          <ActionButton
            variant='contained'
            color='primary'
            type='submit'
            disabled={!possoEnviar()}
          >
            {id ? 'Alterar' : 'Cadastrar'}
          </ActionButton>
        </ActionsToolbar>
      </form>
    </>
  );
};

export default CadastroVeiculo;

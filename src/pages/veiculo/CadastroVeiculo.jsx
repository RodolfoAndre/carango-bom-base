import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Typography, TextField } from '@material-ui/core';

import { ActionsToolbar, ActionButton } from '../../assets/GlobalStyles.jsx';

import useErros from '../../hooks/useErros';
import VeiculoService from '../../services/VeiculoService';

const CadastroVeiculo = () => {
  const [veiculo, setVeiculo] = useState('');
  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Modelo deve ter ao menos 3 letras' };
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
    if (id) {
      VeiculoService.consultar(id).then((veiculo) =>
        setVeiculo(veiculo.modelo),
      );
    }
  }, [id]);

  const cancelar = () => history.goBack();

  const cadastrarVeiculo = () => {
    VeiculoService.cadastrar({ modelo: veiculo }).then(() => {
      setVeiculo('');
      history.goBack();
    });
  };

  const alterarVeiculo = () => {
    VeiculoService.alterar({ id, modelo: veiculo }).then(() => {
      setVeiculo('');
      history.goBack();
    });
  };

  const cadastrarOuAlterarVeiculo = (event) => {
    event.preventDefault();

    if (!possoEnviar()) return;
    if (id) alterarVeiculo();
    else cadastrarVeiculo();
  };

  return (
    <>
      <Typography component='h2' variant='h4'>
        {id ? 'Alterar veículo' : 'Cadastrar veículo'}
      </Typography>
      <form onSubmit={(event) => cadastrarOuAlterarVeiculo(event)}>
        <TextField
          value={veiculo.marca?.nome}
          onChange={(evt) => setVeiculo(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name='marca'
          id='marca'
          data-testid='marca'
          label='Marca'
          type='text'
          variant='outlined'
          fullWidth
          required
          margin='normal'
        />

        <TextField
          value={veiculo.modelo}
          onChange={(evt) => setVeiculo(evt.target.value)}
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
          value={veiculo.ano}
          onChange={(evt) => setVeiculo(evt.target.value)}
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
          value={veiculo.valor}
          onChange={(evt) => setVeiculo(evt.target.value)}
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

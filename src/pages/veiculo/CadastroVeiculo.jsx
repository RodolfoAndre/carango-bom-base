import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { Button, TextField } from '@material-ui/core';

import useErros from '../../hooks/useErros';
import VeiculoService from '../../services/VeiculoService';

const CadastroVeiculo = () => {
  const [veiculo, setVeiculo] = useState('');
  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    veiculo: (dado) => {
      if (!dado || !dado.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (dado.length <= 3)
        return { valido: false, texto: 'Veiculo deve ter ao menos 3 letras' };
      return { valido: true };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  useEffect(() => {
    if (id) {
      VeiculoService.consultar(id).then((veiculo) => setVeiculo(veiculo.nome));
    }
  }, [id]);

  const cancelar = () => history.goBack();

  const cadastrarVeiculo = () => {
    VeiculoService.cadastrar({ nome: veiculo }).then(() => {
      setVeiculo('');
      history.goBack();
    });
  };

  const alterarVeiculo = () => {
    VeiculoService.alterar({ id, nome: veiculo }).then(() => {
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
    <form onSubmit={(event) => cadastrarOuAlterarVeiculo(event)}>
      <TextField
        value={veiculo}
        onChange={(evt) => setVeiculo(evt.target.value)}
        onBlur={validarCampos}
        helperText={erros.veiculo.texto}
        error={!erros.veiculo.valido}
        name='veiculo'
        id='veiculo'
        data-testid='veiculo'
        label='Veículo'
        type='text'
        variant='outlined'
        fullWidth
        required
        margin='normal'
      />

      <Button
        variant='contained'
        color='primary'
        type='submit'
        disabled={!possoEnviar()}
      >
        {id ? 'Alterar' : 'Cadastrar'}
      </Button>

      <Button variant='contained' color='secondary' onClick={cancelar}>
        Cancelar
      </Button>
    </form>
  );
};

export default CadastroVeiculo;

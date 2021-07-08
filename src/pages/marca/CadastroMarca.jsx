/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { TextField } from '@material-ui/core';

import {
  PageTitle,
  ActionsToolbar,
  ActionButton,
} from '../../assets/GlobalStyles.jsx';

import useErros from '../../hooks/useErros';
import MarcaService from '../../services/MarcaService';

function CadastroMarca() {
  const [marca, setMarca] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (dado) => {
      if (dado && dado.erro) {
        return { valido: false, texto: dado.erro };
      } else if (dado && dado.length < 3) {
        return { valido: false, texto: 'Marca deve ter ao menos 3 letras.' };
      } else {
        return { valido: true };
      }
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.goBack();
  }

  const avaliarResponse = (response) => {
    let wrappedResponse = {};
    if (response.status === 500) {
      wrappedResponse = {
        erro: true,
        target: {
          name: 'marca',
          value: { erro: response.message },
        },
      };
    } else {
      wrappedResponse = { erro: false, dados: response.data };
    }
    return wrappedResponse;
  };

  useEffect(() => {
    if (id) {
      MarcaService.consultar(id).then((marca) => setMarca(marca.nome));
    }
  }, [id]);

  return (
    <>
      <PageTitle component='h2' variant='h4'>
        {id ? 'Alterar marca' : 'Cadastrar marca'}
      </PageTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (possoEnviar()) {
            if (id) {
              MarcaService.alterar({ id, nome: marca }).then((response) => {
                const dados = avaliarResponse(response);
                if (dados.erro) {
                  validarCampos(dados);
                } else {
                  history.goBack();
                }
              });
            } else {
              MarcaService.cadastrar({ nome: marca }).then((response) => {
                const dados = avaliarResponse(response);
                if (dados.erro) {
                  validarCampos(dados);
                } else {
                  setMarca('');
                  history.goBack();
                }
              });
            }
          }
        }}
      >
        <TextField
          value={marca}
          onChange={(evt) => setMarca(evt.target.value)}
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
}

export default CadastroMarca;

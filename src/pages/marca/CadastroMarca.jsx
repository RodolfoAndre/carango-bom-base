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
  const [titulo, setTitutlo] = useState('');
  const [nomeMetodo, setNomeMetodo] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (marcaAValidar) => {
      if (marcaAValidar && marcaAValidar.length < 2) {
        return { valido: false, texto: 'Marca deve ter ao menos 2 letras.' };
      } else {
        return { valido: true };
      }
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      setTitutlo('Alterar marca');
      setNomeMetodo('alterar');
      MarcaService.consultar(id).then((marcaConsultada) =>
        setMarca(marcaConsultada.nome)
      );
    } else {
      setTitutlo('Cadastrar marca');
      setNomeMetodo('cadastrar');
    }
  }, [id]);

  return (
    <>
      <PageTitle component="h2" variant="h4">
        {titulo}
      </PageTitle>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (possoEnviar()) {
            MarcaService[nomeMetodo]({ id, nome: marca }).then((response) => {
              if (!response?.error) {
                history.goBack();
              }
            });
          }
        }}
      >
        <TextField
          value={marca}
          onChange={(evt) => setMarca(evt.target.value)}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name="marca"
          id="marca"
          data-testid="marca"
          label="Marca"
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <ActionsToolbar>
          <ActionButton
            variant="contained"
            color="secondary"
            onClick={cancelar}
          >
            Cancelar
          </ActionButton>
          <ActionButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={!possoEnviar()}
          >
            {nomeMetodo}
          </ActionButton>
        </ActionsToolbar>
      </form>
    </>
  );
}

export default CadastroMarca;

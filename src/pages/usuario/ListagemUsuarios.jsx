import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { DataGrid } from '@material-ui/data-grid';

import {
  MainContent,
  ActionsToolbar,
  ActionButton,
  PageTitle,
} from '../../assets/GlobalStyles.jsx';

import { SUCCESS_ALERT, ERROR_ALERT } from '../../Constants';

import { useStyles } from '../../assets/DataGridStyles';

import UsuarioService from '../../services/UsuarioService';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';

const colunas = [{ field: 'nome', headerName: 'Nome', width: 200 }];

const ListagemUsuarios = ({ handleOpenSnackbar }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const usuarioAutenticado = useContext(UsuarioAutenticado);

  const carregarUsuarios = () => {
    UsuarioService.listar().then((response) => {
      setUsuarios(response);
    });
  };

  const usuarioPodeSerExcluido = (nomeUsuario) => {
    return nomeUsuario !== usuarioAutenticado.nome;
  };

  const avaliarUsuarioASerExcluido = (usuarioASerExcluido) => {
    if (usuarioPodeSerExcluido(usuarioASerExcluido.nome)) {
      setUsuarioSelecionado(usuarioASerExcluido);
    } else {
      setUsuarioSelecionado(null);
    }
  };

  const excluir = () => {
    if (usuarioPodeSerExcluido(usuarioSelecionado.nome)) {
      UsuarioService.excluir(usuarioSelecionado).then((response) => {
        if (!response?.error) {
          handleOpenSnackbar('Usuário excluído com sucesso', SUCCESS_ALERT);
          setUsuarioSelecionado(null);
          carregarUsuarios();
        } else handleOpenSnackbar(response.message, ERROR_ALERT);
      });
    }
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const classes = useStyles();

  return (
    <MainContent>
      <PageTitle component='h2' variant='h4'>
        Lista de usuários
      </PageTitle>
      <DataGrid
        className={classes.root}
        rows={usuarios}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          avaliarUsuarioASerExcluido(gridSelection.data)
        }
      />

      <ActionsToolbar>
        <ActionButton
          variant='contained'
          color='secondary'
          disabled={!usuarioSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </ActionButton>
      </ActionsToolbar>
    </MainContent>
  );
};

ListagemUsuarios.propTypes = {
  handleOpenSnackbar: PropTypes.func,
};

export default ListagemUsuarios;

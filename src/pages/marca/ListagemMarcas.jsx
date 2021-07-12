import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';

import {
  MainContent,
  PageTitle,
  ActionsToolbar,
  ActionButton,
  StyledFab,
} from '../../assets/GlobalStyles.jsx';

import { useStyles } from '../../assets/DataGridStyles';

import { SUCCESS_ALERT, ERROR_ALERT } from '../../Constants';

import MarcaService from '../../services/MarcaService';

const colunas = [{ field: 'nome', headerName: 'Marca', width: 200 }];

function ListagemMarcas({ handleOpenSnackbar }) {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState(null);
  const history = useHistory();

  useEffect(() => {
    carregarMarcas();
    return () => {
      setMarcas([]);
      setMarcaSelecionada(null);
    };
  }, []);

  const classes = useStyles();

  const carregarMarcas = () => {
    MarcaService.listar().then((dados) => {
      if (!dados?.error) {
        setMarcas(dados);
      }
    });
  };

  const alterar = () => {
    history.push('/alteracao-marca/' + marcaSelecionada.id);
  };

  const excluir = () => {
    MarcaService.excluir(marcaSelecionada).then((response) => {
      if (!response?.error) {
        handleOpenSnackbar('Marca excluída com sucesso', SUCCESS_ALERT);
        setMarcaSelecionada(null);
        carregarMarcas();
      } else handleOpenSnackbar(response.message, ERROR_ALERT);
    });
  };

  return (
    <MainContent>
      <PageTitle component='h2' variant='h4'>
        Lista de marcas
      </PageTitle>
      <DataGrid
        className={classes.root}
        rows={marcas}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setMarcaSelecionada(gridSelection.data)
        }
      />

      <ActionsToolbar>
        <ActionButton
          variant='contained'
          color='secondary'
          disabled={!marcaSelecionada}
          onClick={() => excluir()}
        >
          Excluir
        </ActionButton>
        <ActionButton
          variant='contained'
          color='primary'
          disabled={!marcaSelecionada}
          onClick={() => alterar()}
        >
          Alterar
        </ActionButton>
      </ActionsToolbar>

      <StyledFab
        color='primary'
        aria-label='add'
        onClick={() => history.push('/cadastro-marca')}
      >
        <AddIcon />
      </StyledFab>
    </MainContent>
  );
}

ListagemMarcas.propTypes = {
  handleOpenSnackbar: PropTypes.func,
};

export default ListagemMarcas;

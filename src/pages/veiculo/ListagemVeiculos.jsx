import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import NumberFormat from 'react-number-format';

import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';

import {
  MainContent,
  PageTitle,
  ActionsToolbar,
  ActionButton,
  StyledFab,
} from '../../assets/GlobalStyles.jsx';

import { useStyles } from './styles';

import VeiculoService from '../../services/VeiculoService';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado.js';

const formatarValor = (params) => (
  <NumberFormat
    value={params.value.toFixed(2)}
    isNumericString
    displayType='text'
    thousandSeparator='.'
    decimalSeparator=','
    prefix='R$'
  />
);

const colunas = [
  {
    field: 'marca',
    headerName: 'Marca',
    width: 200,
  },
  { field: 'modelo', headerName: 'Modelo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  {
    field: 'valor',
    headerName: 'Valor',
    width: 200,
    renderCell: formatarValor,
  },
];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const history = useHistory();
  const usuarioAutenticado = useContext(UsuarioAutenticado);

  useEffect(() => carregarVeiculos(), []);

  const classes = useStyles();

  const carregarVeiculos = () => {
    VeiculoService.listar().then((dados) => {
      setVeiculos(dados);
    });
  };

  const excluirVeiculo = () => {
    VeiculoService.excluir(veiculoSelecionado).then(() => {
      setVeiculoSelecionado(null);
      carregarVeiculos();
    });
  };

  const alterarVeiculo = () => {
    history.push(`/alteracao-veiculo/${veiculoSelecionado.id}`);
  };

  const renderAcoes = () => {
    if (usuarioAutenticado?.token?.length > 0) {
      return (
        <>
          <ActionsToolbar>
            <ActionButton
              variant='contained'
              color='secondary'
              disabled={!veiculoSelecionado}
              onClick={() => excluirVeiculo()}
            >
              Excluir
            </ActionButton>
            <ActionButton
              variant='contained'
              color='primary'
              disabled={!veiculoSelecionado}
              onClick={() => alterarVeiculo()}
            >
              Alterar
            </ActionButton>
          </ActionsToolbar>
          <StyledFab
            color='primary'
            aria-label='add'
            onClick={() => history.push('/cadastro-veiculo')}
          >
            <AddIcon />
          </StyledFab>
        </>
      );
    }
    return <></>;
  };

  return (
    <MainContent>
      <PageTitle component='h2' variant='h4'>
        Lista de veículos
      </PageTitle>
      <DataGrid
        className={classes.root}
        rows={veiculos}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setVeiculoSelecionado(gridSelection.data)
        }
      />
      {renderAcoes()}
    </MainContent>
  );
};

export default ListagemVeiculos;

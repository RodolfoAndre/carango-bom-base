import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import NumberFormat from 'react-number-format';

import { DataGrid } from '@material-ui/data-grid';
import AddIcon from '@material-ui/icons/Add';
import {
  MainContent,
  ActionsToolbar,
  ActionButton,
  StyledFab,
} from '../../assets/GlobalStyles.jsx';

import VeiculoService from '../../services/VeiculoService';

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

  useEffect(() => carregarVeiculos(), []);

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

  return (
    <MainContent>
      <DataGrid
        rows={veiculos}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setVeiculoSelecionado(gridSelection.data)
        }
      />
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
    </MainContent>
  );
};

export default ListagemVeiculos;

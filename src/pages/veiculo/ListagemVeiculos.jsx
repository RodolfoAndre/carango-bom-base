import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import {
  MainContent,
  ActionsToolbar,
  ActionButton,
} from '../../assets/GlobalStyles.jsx';

import VeiculoService from '../../services/VeiculoService';

const colunas = [
  {
    field: 'marcaNome',
    headerName: 'Marca',
    width: 200,
    valueFormatter: (params) => params.row.marca.nome,
  },
  { field: 'modelo', headerName: 'Modelo', width: 200 },
  { field: 'ano', headerName: 'Ano', width: 200 },
  { field: 'valor', headerName: 'Valor', width: 200 },
];

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);

  useEffect(() => carregarVeiculos(), []);

  const carregarVeiculos = () => {
    VeiculoService.listar().then((dados) => setVeiculos(dados));
  };

  const excluirVeiculo = () => {
    VeiculoService.excluir(veiculoSelecionado);
    setVeiculoSelecionado(null);
    carregarVeiculos();
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
          variant="contained"
          color="secondary"
          disabled={!veiculoSelecionado}
          onClick={() => excluirVeiculo()}
        >
          Excluir
        </ActionButton>
      </ActionsToolbar>
    </MainContent>
  );
};

export default ListagemVeiculos;

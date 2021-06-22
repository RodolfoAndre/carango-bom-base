import React, { useState, useEffect } from 'react';
import { DataGrid } from '@material-ui/data-grid';

import { MainContent } from './styles';

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

  useEffect(() => carregarVeiculos(), []);

  const carregarVeiculos = () => {
    VeiculoService.listar().then((dados) => setVeiculos(dados));
  };

  return (
    <MainContent>
      <DataGrid
        rows={veiculos}
        columns={colunas}
        onRowSelected={(gridSelection) => console.log(gridSelection.data)}
      />
    </MainContent>
  );
};

export default ListagemVeiculos;

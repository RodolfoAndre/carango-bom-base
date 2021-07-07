import React, { useEffect, useState } from 'react';

import { DataGrid } from '@material-ui/data-grid';

import {
  MainContent,
  ActionsToolbar,
  ActionButton,
} from '../../assets/GlobalStyles.jsx';

import UsuarioService from '../../services/UsuarioService';

const colunas = [{ field: 'nome', headerName: 'Nome', width: 200 }];

const ListagemUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);

  const carregarUsuarios = () => {
    UsuarioService.listar().then((response) => {
      setUsuarios(response);
    });
  };

  const excluir = () => {
    UsuarioService.excluir(usuarioSelecionado).then(() => {
      setUsuarioSelecionado(null);
      carregarUsuarios();
    });
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  return (
    <MainContent>
      <DataGrid
        rows={usuarios}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setUsuarioSelecionado(gridSelection.data)
        }
      />

      <ActionsToolbar>
        <ActionButton
          variant="contained"
          color="secondary"
          disabled={!usuarioSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </ActionButton>
      </ActionsToolbar>
    </MainContent>
  );
};

export default ListagemUsuarios;

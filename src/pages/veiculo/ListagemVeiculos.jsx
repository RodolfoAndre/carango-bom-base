import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router';
import NumberFormat from 'react-number-format';
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

import VeiculoService from '../../services/VeiculoService';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado.js';
import VeiculosFiltro from '../../components/veiculos-filtro/VeiculosFiltro.jsx';
import MarcaService from '../../services/MarcaService.js';

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

const ListagemVeiculos = ({ handleOpenSnackbar }) => {
  const [veiculos, setVeiculos] = useState([]);
  const [veiculosAFiltrar, setVeiculosAFiltrar] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState(null);
  const [marcas, setMarcas] = useState([]);
  const history = useHistory();
  const usuarioAutenticado = useContext(UsuarioAutenticado);

  useEffect(() => {
    carregarMarcas();
    carregarVeiculos();
    return () => {
      setVeiculos([]);
      setVeiculoSelecionado(null);
      setMarcas([]);
    };
  }, []);

  const classes = useStyles();

  const carregarVeiculos = () => {
    VeiculoService.listar().then((dados) => {
      setVeiculos(dados);
      setVeiculosAFiltrar(dados);
    });
  };

  const carregarMarcas = () => {
    if (usuarioAutenticado?.token?.length > 0) {
      MarcaService.listar().then((dados) => {
        setMarcas(dados);
      });
    }
  };

  const excluirVeiculo = () => {
    VeiculoService.excluir(veiculoSelecionado).then((response) => {
      if (!response?.error) {
        handleOpenSnackbar('Veículo excluído com sucesso', SUCCESS_ALERT);
        setVeiculoSelecionado(null);
        carregarVeiculos();
      } else handleOpenSnackbar(response.message, ERROR_ALERT);
    });
  };

  const alterarVeiculo = () => {
    history.push(`/alteracao-veiculo/${veiculoSelecionado.id}`);
  };

  const aplicarFiltro = (filtroObj) => {
    if (filtroObj) {
      VeiculoService.filtrar(filtroObj).then((response) => {
        setVeiculos(response);
      });
    } else {
      carregarVeiculos();
    }
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

  const renderFiltro = () => {
    if (usuarioAutenticado?.token?.length > 0) {
      return (
        <VeiculosFiltro
          marcasOpcoes={marcas}
          modelosOpcoes={veiculosAFiltrar}
          handleChangeFiltro={aplicarFiltro}
        />
      );
    }
    return <></>;
  };

  return (
    <MainContent>
      <PageTitle component='h2' variant='h4'>
        Lista de veículos
      </PageTitle>
      {renderFiltro()}
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

ListagemVeiculos.propTypes = {
  handleOpenSnackbar: PropTypes.func,
};

export default ListagemVeiculos;

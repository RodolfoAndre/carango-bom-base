import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

import { ActionsToolbar, ActionButton } from '../../assets/GlobalStyles.jsx';

import { FiltroWrapper, FiltroTitle, FormFiltro } from './styles';

import useErros from '../../hooks/useErros';

const VeiculosFiltro = ({
  marcasOpcoes,
  modelosOpcoes,
  handleChangeFiltro,
}) => {
  const [marcas, setMarcas] = useState([]);
  const [modelos, setModelos] = useState([]);
  const [precoMinimo, setPrecoMinimo] = useState('');
  const [precoMaximo, setPrecoMaximo] = useState('');

  const validacoes = {
    precoMinimo: (dado) => {
      return validaEntradasPreco('Preço mínmo', dado);
    },
    precoMaximo: (dado) => {
      return validaEntradasPreco('Preço máximo', dado);
    },
  };

  const validaEntradasPreco = (nome, dado) => {
    if (isNaN(dado))
      return { valido: false, texto: `${nome} deve ser numérico` };
    if (parseFloat(precoMaximo) < parseFloat(precoMinimo))
      return {
        valido: false,
        texto: 'Preço máximo deve ser maior que preço mínimo',
      };
    return { valido: true };
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  const checarHaFiltros = () => {
    return (
      marcas.length > 0 || modelos.length > 0 || precoMinimo || precoMaximo
    );
  };

  const limparFiltros = () => {
    setMarcas([]);
    setModelos([]);
    setPrecoMinimo('');
    setPrecoMaximo('');
    validarCampos({ target: { name: 'precoMinimo', value: '' } });
    validarCampos({ target: { name: 'precoMaximo', value: '' } });
    handleChangeFiltro(null);
  };

  const enviarFiltro = (e) => {
    e.preventDefault();
    const filtroObj = {
      marcas,
      modelos,
      precoMinimo: parseFloat(precoMinimo),
      precoMaximo: parseFloat(precoMaximo),
    };
    handleChangeFiltro(filtroObj);
  };

  const renderizarMarcas = () => {
    if (marcasOpcoes.length > 0) {
      return marcasOpcoes.map((marca) => (
        <MenuItem value={marca?.nome} key={marca?.id}>
          {marca?.nome}
        </MenuItem>
      ));
    }
  };

  const renderizarModelos = () => {
    if (modelosOpcoes.length > 0) {
      return modelosOpcoes.map((modelo) => (
        <MenuItem value={modelo.modelo} key={modelo?.id}>
          {modelo?.modelo}
        </MenuItem>
      ));
    }
  };

  return (
    <FiltroWrapper>
      <FiltroTitle variant='h5'>Filtros</FiltroTitle>
      <FormFiltro onSubmit={(event) => enviarFiltro(event)}>
        <FormControl variant='outlined' margin='normal' fullWidth size='medium'>
          <InputLabel>Marcas</InputLabel>
          <Select
            label='Marcas'
            value={marcas}
            onChange={(e) => setMarcas(e.target.value)}
            name='marcas'
            id='marcas'
            multiple
            data-testid='marcas'
          >
            {renderizarMarcas()}
          </Select>
        </FormControl>

        <FormControl variant='outlined' margin='normal' fullWidth size='medium'>
          <InputLabel>Modelos</InputLabel>
          <Select
            label='Modelos'
            value={modelos}
            onChange={(e) => setModelos(e.target.value)}
            name='modelos'
            id='modelos'
            multiple
            data-testid='modelos'
          >
            {renderizarModelos()}
          </Select>
        </FormControl>

        <TextField
          size='medium'
          value={precoMinimo}
          onChange={(evt) => {
            setPrecoMinimo(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.precoMinimo.texto}
          error={!erros.precoMinimo.valido}
          name='precoMinimo'
          id='preco-min'
          data-testid='preco-min'
          label='Preço Mínimo'
          type='text'
          variant='outlined'
          margin='normal'
        />

        <TextField
          size='medium'
          value={precoMaximo}
          onChange={(evt) => {
            setPrecoMaximo(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.precoMaximo.texto}
          error={!erros.precoMaximo.valido}
          name='precoMaximo'
          id='preco-max'
          data-testid='preco-max'
          label='Preço Máximo'
          type='text'
          variant='outlined'
          margin='normal'
        />
      </FormFiltro>
      <ActionsToolbar>
        <ActionButton
          variant='contained'
          color='secondary'
          data-testid='limpar-filtros'
          disabled={!checarHaFiltros()}
          onClick={limparFiltros}
        >
          Limpar Filtros
        </ActionButton>
        <ActionButton
          variant='contained'
          color='primary'
          type='submit'
          data-testid='filtrar'
          disabled={!checarHaFiltros() || !possoEnviar()}
        >
          Filtrar
        </ActionButton>
      </ActionsToolbar>
    </FiltroWrapper>
  );
};

VeiculosFiltro.propTypes = {
  marcasOpcoes: PropTypes.array,
  modelosOpcoes: PropTypes.array,
  handleChangeFiltro: PropTypes.func,
};

export default VeiculosFiltro;

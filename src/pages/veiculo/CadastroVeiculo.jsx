import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';

import { TextField, MenuItem } from '@material-ui/core';

import {
  PageTitle,
  ActionsToolbar,
  ActionButton,
} from '../../assets/GlobalStyles.jsx';

import useErros from '../../hooks/useErros';
import VeiculoService from '../../services/VeiculoService';
import MarcaService from '../../services/MarcaService.js';

const CadastroVeiculo = () => {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [valor, setValor] = useState('');

  const history = useHistory();

  const { id } = useParams();

  const validacoes = {
    marca: (dado) => {
      return avaliarEntradasTexto('Marca', dado);
    },
    modelo: (dado) => {
      return avaliarEntradasTexto('Modelo', dado);
    },
    ano: (dado) => {
      return avaliarEntradaAno(dado);
    },
    valor: (dado) => {
      return avaliarEntradaNumero(dado);
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  useEffect(() => {
    MarcaService.listar().then((dados) => {
      setMarcas(dados);

      if (id) {
        VeiculoService.consultar(id).then((veiculoRetornado) => {
          setMarcaSelecionada(veiculoRetornado.marca);
          setModelo(veiculoRetornado.modelo);
          setAno(veiculoRetornado.ano);
          setValor(veiculoRetornado.valor);
        });
      }
    });
    return () => setMarcas([]);
  }, [id]);

  const cancelar = () => history.goBack();

  const cadastrarVeiculo = (veiculo) => {
    VeiculoService.cadastrar(veiculo).then(() => {
      history.goBack();
    });
  };

  const alterarVeiculo = (veiculo) => {
    VeiculoService.alterar(veiculo).then(() => {
      history.goBack();
    });
  };

  const cadastrarOuAlterarVeiculo = (event) => {
    event.preventDefault();

    if (!possoEnviar()) return;

    const veiculo = { marca: marcaSelecionada, modelo, ano, valor };

    if (id) {
      veiculo.id = id;
      alterarVeiculo(veiculo);
    } else cadastrarVeiculo(veiculo);
  };

  const renderizarMarcas = () => {
    if (marcas.length > 0) {
      return marcas.map((marca) => (
        <MenuItem value={marca.nome} key={marca?.id}>
          {marca?.nome}
        </MenuItem>
      ));
    }
  };

  const avaliarCampoObrigatorio = (valor) => {
    return !valor || !valor.length;
  };

  const avaliarEntradasTexto = (nome, valor) => {
    if (avaliarCampoObrigatorio(valor))
      return { valido: false, texto: 'Campo obrigatório' };
    if (valor.length < 2)
      return { valido: false, texto: `${nome} deve ter ao menos 2 letras` };
    return { valido: true };
  };

  const avaliarEntradaAno = (valor) => {
    if (avaliarCampoObrigatorio(valor))
      return { valido: false, texto: 'Campo obrigatório' };
    if (valor.length != 4 || isNaN(valor))
      return { valido: false, texto: 'Ano deve ter 4 números' };
    return { valido: true };
  };

  const avaliarEntradaNumero = (valor) => {
    if (avaliarCampoObrigatorio(valor))
      return { valido: false, texto: 'Campo obrigatório' };
    if (isNaN(valor))
      return { valido: false, texto: 'Valor deve ser numérico' };
    if (parseInt(valor) <= 0)
      return { valido: false, texto: 'Valor deve ser maior que zero' };
    return { valido: true };
  };

  return (
    <>
      <PageTitle component="h2" variant="h4">
        {id ? 'Alterar veículo' : 'Cadastrar veículo'}
      </PageTitle>
      <form onSubmit={(event) => cadastrarOuAlterarVeiculo(event)}>
        <TextField
          value={marcaSelecionada ? marcaSelecionada : ''}
          onChange={(evt) => {
            setMarcaSelecionada(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.marca.texto}
          error={!erros.marca.valido}
          name="marca"
          id="marca"
          data-testid="marca"
          label="Marca"
          variant="outlined"
          fullWidth
          required
          select
          margin="normal"
        >
          <MenuItem value="">
            <em>Selecione uma marca</em>
          </MenuItem>
          {renderizarMarcas()}
        </TextField>

        <TextField
          value={modelo}
          onChange={(evt) => {
            setModelo(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.modelo.texto}
          error={!erros.modelo.valido}
          name="modelo"
          id="modelo"
          data-testid="modelo"
          label="Modelo"
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          value={ano}
          onChange={(evt) => {
            setAno(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.ano.texto}
          error={!erros.ano.valido}
          name="ano"
          id="ano"
          data-testid="ano"
          label="Ano"
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <TextField
          value={valor}
          onChange={(evt) => {
            setValor(evt.target.value);
            validarCampos(evt);
          }}
          onBlur={validarCampos}
          helperText={erros.valor.texto}
          error={!erros.valor.valido}
          name="valor"
          id="valor"
          data-testid="valor"
          label="Valor"
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
            data-testid="cancelar"
            onClick={cancelar}
          >
            Cancelar
          </ActionButton>
          <ActionButton
            variant="contained"
            color="primary"
            type="submit"
            data-testid="cadastrar-ou-alterar"
            disabled={!possoEnviar()}
          >
            {id ? 'Alterar' : 'Cadastrar'}
          </ActionButton>
        </ActionsToolbar>
      </form>
    </>
  );
};

export default CadastroVeiculo;

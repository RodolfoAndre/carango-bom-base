import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ListagemVeiculos from './ListagemVeiculos';
import VeiculoService from '../../services/VeiculoService';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';
import MarcaService from '../../services/MarcaService';

jest.mock('../../services/MarcaService');
jest.mock('../../services/VeiculoService');

const createRender = () => {
  return render(<ListagemVeiculos />);
};

const renderWithContext = (context) => {
  return render(
    <UsuarioAutenticado.Provider value={context}>
      <ListagemVeiculos />
    </UsuarioAutenticado.Provider>
  );
};

const renderWithRouter = (history, context) => {
  return render(
    <Router history={history}>
      <UsuarioAutenticado.Provider value={context}>
        <ListagemVeiculos />
      </UsuarioAutenticado.Provider>
    </Router>
  );
};

describe('Component de ListagemVeiculos', () => {
  beforeEach(() => {
    MarcaService.listar.mockResolvedValue([]);
    VeiculoService.listar.mockResolvedValue([]);
  });

  const history = createMemoryHistory();

  const veiculoSobTest = {
    id: 134,
    marca: 'FORD',
    modelo: 'KA 123456',
    ano: 2021,
    valor: 80000,
  };

  describe('Quando entrar na página', () => {
    describe('Datagrid', () => {
      it('deve ser exibido', async () => {
        const { findByRole } = createRender();
        const grid = await findByRole('grid');
        expect(grid).toBeInTheDocument();
      });

      it('deve exibir colunas de marca, modelo, ano e valor', async () => {
        const { findByText } = createRender();

        const marca = await findByText('Marca');
        const modelo = await findByText('Modelo');
        const ano = await findByText('Ano');

        expect(marca).toBeInTheDocument();
        expect(modelo).toBeInTheDocument();
        expect(ano).toBeInTheDocument();
      });

      it('deve exibir linha com valores de marca, modelo, ano e valor', async () => {
        VeiculoService.listar.mockResolvedValue([veiculoSobTest]);
        const { findByText } = createRender();

        const marca = await findByText(veiculoSobTest.marca);
        const modelo = await findByText(veiculoSobTest.modelo);
        const ano = await findByText(veiculoSobTest.ano);

        expect(marca).toBeInTheDocument();
        expect(modelo).toBeInTheDocument();
        expect(ano).toBeInTheDocument();
      });
    });
  });

  describe('Quando um usuário estiver logado', () => {
    const context = { nome: 'user', token: 'thisisavalidtoken' };
    describe('Botão excluir e alterar', () => {
      it('devem ser exibidos', async () => {
        const { findByText } = renderWithContext(context);
        const botaoExcluir = await findByText('Excluir');
        const botaoAlterar = await findByText('Alterar');

        expect(botaoExcluir).toBeInTheDocument();
        expect(botaoAlterar).toBeInTheDocument();
      });

      it('devem estar desabilitados caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
        const { findByText } = renderWithContext(context);

        const botaoExcluir = (await findByText('Excluir')).parentElement;
        const botaoAlterar = (await findByText('Alterar')).parentElement;

        expect(botaoExcluir).toBeDisabled();
        expect(botaoAlterar).toBeDisabled();
      });

      it('devem estar habilitados caso uma linha do DataGrid tenha sido selecionada', async () => {
        VeiculoService.listar.mockResolvedValue([veiculoSobTest]);

        const { findByText } = renderWithContext(context);
        const row = await findByText(veiculoSobTest.marca);
        fireEvent.click(row);

        const botaoExcluir = (await findByText('Excluir')).parentElement;
        const botaoAlterar = (await findByText('Alterar')).parentElement;

        expect(botaoExcluir).not.toBeDisabled();
        expect(botaoAlterar).not.toBeDisabled();
      });
    });

    describe('Botão adicionar', () => {
      it('deve ser exibido', async () => {
        const { findByLabelText } = renderWithContext(context);
        const botaoAdicionar = await findByLabelText('add');
        expect(botaoAdicionar).toBeInTheDocument();
      });

      it('deve estar habilitado', async () => {
        const { findByLabelText } = renderWithContext(context);
        const botaoAdicionar = await findByLabelText('add');
        expect(botaoAdicionar).not.toBeDisabled();
      });
    });

    describe('Ao clicar no botão', () => {
      describe('Excluir', () => {
        it('deve chamar a função excluir, limpar o veículo selecionado e chamar a função listar', async () => {
          VeiculoService.listar = jest.fn();
          VeiculoService.listar.mockResolvedValue([veiculoSobTest]);
          VeiculoService.excluir = jest.fn(() => Promise.resolve({ data: {} }));

          const { findByText } = renderWithContext(context);
          const row = await findByText(veiculoSobTest.marca);
          fireEvent.click(row);

          const botaoExcluir = (await findByText('Excluir')).parentElement;
          fireEvent.click(botaoExcluir);

          await waitFor(() => {
            expect(VeiculoService.excluir).toHaveBeenCalledWith(veiculoSobTest);
            expect(VeiculoService.excluir).toHaveBeenCalledTimes(1);
          });

          expect(botaoExcluir).toBeDisabled();
          expect(VeiculoService.listar).toHaveBeenCalledTimes(2);
        });
      });

      describe('Alterar', () => {
        it('deve redirecionar para a rota de alteração de veículo', async () => {
          VeiculoService.listar.mockResolvedValue([veiculoSobTest]);
          history.push = jest.fn();

          const { findByText } = renderWithRouter(history, context);
          const row = await findByText(veiculoSobTest.marca);
          fireEvent.click(row);

          const botaoAlterar = (await findByText('Alterar')).parentElement;
          fireEvent.click(botaoAlterar);

          expect(history.push).toHaveBeenCalledTimes(1);
          expect(history.push).toHaveBeenCalledWith(
            `/alteracao-veiculo/${veiculoSobTest.id}`
          );
        });
      });

      describe('Adicionar', () => {
        it('deve redirecionar para a página de cadastro de veículo', async () => {
          history.push = jest.fn();

          const { findByLabelText } = renderWithRouter(history, context);

          const botaoAdicionar = await findByLabelText('add');
          fireEvent.click(botaoAdicionar);

          expect(history.push).toHaveBeenCalledTimes(1);
          expect(history.push).toHaveBeenCalledWith('/cadastro-veiculo');
        });
      });
    });

    describe('Filtros', () => {
      it('deve ser exibido', async () => {
        const { findByText } = renderWithContext(context);

        const tituloFiltro = await findByText('Filtros');

        expect(tituloFiltro).toBeInTheDocument();
      });
    });
  });
});

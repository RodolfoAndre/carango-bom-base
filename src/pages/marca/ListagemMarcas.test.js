import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../services/MarcaService';

jest.mock('../../services/MarcaService');
const handleOpenSnackbar = jest.fn();

const renderComponent = () => {
  return render(<ListagemMarcas handleOpenSnackbar={handleOpenSnackbar} />);
};

const renderWithRouter = (history) => {
  return render(
    <Router history={history}>
      <ListagemMarcas handleOpenSnackbar={handleOpenSnackbar} />
    </Router>
  );
};

describe('Component de ListagemMarcas', () => {
  beforeEach(() => {
    MarcaService.listar.mockResolvedValue([]);
  });

  const history = createMemoryHistory();
  const marcaSobTest = {
    id: 34,
    nome: 'FORD',
  };

  describe('Quando entrar na página', () => {
    it('deve exibir datagrid', async () => {
      const { findByRole } = renderComponent();

      expect(await findByRole('grid')).toBeInTheDocument();
    });

    it('datagrid deve exibir coluna de marca', async () => {
      const { findByText } = renderComponent();

      expect(await findByText('Marca')).toBeInTheDocument();
    });

    it('datagrid deve exibir linha com valores de marca', async () => {
      MarcaService.listar.mockResolvedValue([marcaSobTest]);
      const { findByText } = renderComponent();

      expect(await findByText('FORD')).toBeInTheDocument();
    });

    it('botão excluir deve ser exibido', async () => {
      const { findByText } = renderComponent();

      expect(await findByText('Excluir')).toBeInTheDocument();
    });

    it('botão alterar deve ser exibido', async () => {
      const { findByText } = renderComponent();

      expect(await findByText('Alterar')).toBeInTheDocument();
    });

    it('botão adicionar deve ser exibido', async () => {
      const { findByLabelText } = renderComponent();

      expect(await findByLabelText('add')).toBeInTheDocument();
    });
  });

  describe('O botão excluir deve', () => {
    it('estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
      const { findByText } = renderComponent();
      const botaoExcluir = (await findByText('Excluir')).parentElement;

      expect(botaoExcluir).toBeDisabled();
    });

    it('estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([marcaSobTest]);
      const { findByText } = renderComponent();

      const row = await findByText(marcaSobTest.nome);
      fireEvent.click(row);
      const botaoExcluir = (await findByText('Excluir')).parentElement;

      expect(botaoExcluir).not.toBeDisabled();
    });

    it('chamar a função excluir, limpar a marca selecionada e chamar a função listar', async () => {
      MarcaService.listar = jest.fn();
      MarcaService.listar.mockResolvedValue([marcaSobTest]);
      MarcaService.excluir = jest.fn(() => Promise.resolve({ data: {} }));
      const { findByText } = renderComponent();

      const row = await findByText(marcaSobTest.nome);
      fireEvent.click(row);
      const botaoExcluir = (await findByText('Excluir')).parentElement;
      fireEvent.click(botaoExcluir);

      await waitFor(() => {
        expect(MarcaService.excluir).toHaveBeenCalledWith(marcaSobTest);
      });
      expect(botaoExcluir).toBeDisabled();
      expect(MarcaService.listar).toHaveBeenCalledTimes(2);
    });
  });

  describe('O botão alterar deve', () => {
    it('estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
      const { findByText } = renderComponent();

      const botaoExcluir = (await findByText('Alterar')).parentElement;

      expect(botaoExcluir).toBeDisabled();
    });

    it('estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([marcaSobTest]);
      const { findByText } = renderComponent();

      const row = await findByText(marcaSobTest.nome);
      fireEvent.click(row);
      const botaoAlterar = (await findByText('Alterar')).parentElement;

      expect(botaoAlterar).not.toBeDisabled();
    });

    it('rotear para a página /alteracao-marca/:id', async () => {
      MarcaService.listar.mockResolvedValue([marcaSobTest]);
      history.push = jest.fn();
      const { findByText } = renderWithRouter(history);

      const row = await findByText(marcaSobTest.nome);
      fireEvent.click(row);
      const botaoAlterar = (await findByText('Alterar')).parentElement;
      fireEvent.click(botaoAlterar);

      expect(history.push).toHaveBeenCalledWith(
        `/alteracao-marca/${marcaSobTest.id}`
      );
    });
  });

  describe('O botão adicionar deve', () => {
    it('estar habilitado', async () => {
      const { findByLabelText } = renderComponent();

      const botaoAdicionar = await findByLabelText('add');

      expect(botaoAdicionar).not.toBeDisabled();
    });

    it('rotear para a página de cadastrar marca', async () => {
      history.push = jest.fn();
      const { findByLabelText } = renderWithRouter(history);

      const botaoAdicionar = await findByLabelText('add');
      fireEvent.click(botaoAdicionar);

      expect(history.push).toHaveBeenCalledWith('/cadastro-marca');
    });
  });
});

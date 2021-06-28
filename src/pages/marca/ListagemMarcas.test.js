import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import ListagemMarcas from './ListagemMarcas';
import MarcaService from '../../services/MarcaService';

jest.mock('../../services/MarcaService');

const renderComponent = () => {
  return render(<ListagemMarcas />);
};

// TODO revisar quando tivermos implementado a feature de autenticação
describe('Component de ListagemMarcas', () => {
  describe('Quando entrar na página', () => {
    it('deve exibir datagrid', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByRole } = renderComponent();
      expect(await findByRole('grid')).toBeInTheDocument();
    });

    it('datagrid deve exibir coluna de marca', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByText } = renderComponent();
      expect(await findByText('Marca')).toBeInTheDocument();
    });

    it('datagrid deve exibir linha com valores de marca', async () => {
      MarcaService.listar.mockResolvedValue([
        {
          id: 34,
          nome: 'FORD',
        },
      ]);
      const { findByText } = renderComponent();
      expect(await findByText('FORD')).toBeInTheDocument();
    });

    it('botão excluir deve ser exibido', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByText } = renderComponent();
      expect(await findByText('Excluir')).toBeInTheDocument();
    });

    it('botão alterar deve ser exibido', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByText } = renderComponent();
      expect(await findByText('Alterar')).toBeInTheDocument();
    });

    it('botão adicionar deve ser exibido', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByLabelText } = renderComponent();
      expect(await findByLabelText('add')).toBeInTheDocument();
    });
  });

  describe('O botão excluir deve', () => {
    it('estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByText } = renderComponent();
      const botaoExcluir = (await findByText('Excluir')).parentElement;
      expect(botaoExcluir).toBeDisabled();
    });

    it('estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([
        {
          id: 34,
          nome: 'FORD',
        },
      ]);
      const { findByText } = renderComponent();
      const row = await findByText('FORD');
      fireEvent.click(row);

      const botaoExcluir = (await findByText('Excluir')).parentElement;
      expect(botaoExcluir).not.toBeDisabled();
    });
  });

  describe('O botão alterar deve', () => {
    it('estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByText } = renderComponent();
      const botaoExcluir = (await findByText('Alterar')).parentElement;
      expect(botaoExcluir).toBeDisabled();
    });

    it('estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
      MarcaService.listar.mockResolvedValue([
        {
          id: 34,
          nome: 'FORD',
        },
      ]);
      const { findByText } = renderComponent();
      const row = await findByText('FORD');
      fireEvent.click(row);

      const botaoAlterar = (await findByText('Alterar')).parentElement;
      expect(botaoAlterar).not.toBeDisabled();
    });
  });

  describe('O botão adicionar deve', () => {
    it('estar habilitado', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const { findByLabelText } = renderComponent();
      const botaoAdicionar = await findByLabelText('add');
      expect(botaoAdicionar).not.toBeDisabled();
    });

    it('rotear para a página de cadastrar marca', async () => {
      MarcaService.listar.mockResolvedValue([]);
      const history = createMemoryHistory();
      history.push = jest.fn();

      const { findByLabelText } = render(
        <Router history={history}>
          <ListagemMarcas />
        </Router>
      );
      const botaoAdicionar = await findByLabelText('add');
      fireEvent.click(botaoAdicionar);
      expect(history.push).toHaveBeenCalledWith('/cadastro-marca');
    });
  });
});

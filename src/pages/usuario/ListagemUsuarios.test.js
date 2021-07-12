import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import ListagemUsuarios from './ListagemUsuarios';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';
import UsuarioService from '../../services/UsuarioService';

jest.mock('../../services/UsuarioService');
const handleOpenSnackbar = jest.fn();

const createRender = () => {
  return render(<ListagemUsuarios handleOpenSnackbar={handleOpenSnackbar} />);
};

const renderWithContext = (context) => {
  return render(
    <UsuarioAutenticado.Provider value={context}>
      <ListagemUsuarios handleOpenSnackbar={handleOpenSnackbar} />
    </UsuarioAutenticado.Provider>
  );
};

describe('Component de ListagemUsuarios', () => {
  beforeEach(() => {
    UsuarioService.listar.mockResolvedValue([]);
  });

  const usuarioSobTest = {
    id: 1,
    nome: 'admin',
    senha: null,
  };

  describe('Quando entrar na página', () => {
    describe('Datagrid', () => {
      it('deve ser exibido', async () => {
        const { findByRole } = createRender();
        const grid = await findByRole('grid');
        expect(grid).toBeInTheDocument();
      });

      it('deve exibir coluna de nome', async () => {
        const { findByText } = createRender();

        const nome = await findByText('Nome');

        expect(nome).toBeInTheDocument();
      });

      it('deve exibir linha com valor de nome', async () => {
        UsuarioService.listar.mockResolvedValue([usuarioSobTest]);
        const { findByText } = createRender();

        const nome = await findByText(usuarioSobTest.nome);

        expect(nome).toBeInTheDocument();
      });
    });
  });

  describe('Quando um usuário estiver logado', () => {
    const context = { nome: 'user', token: 'thisisavalidtoken' };
    describe('Botão excluir', () => {
      it('deve ser exibido', async () => {
        const { findByText } = renderWithContext(context);
        const botaoExcluir = await findByText('Excluir');

        expect(botaoExcluir).toBeInTheDocument();
      });

      it('deve estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
        const { findByText } = renderWithContext(context);

        const botaoExcluir = (await findByText('Excluir')).parentElement;

        expect(botaoExcluir).toBeDisabled();
      });

      it('deve estar desabilitado caso o usuário selecionado do DataGrid for o mesmo que estiver autenticado', async () => {
        UsuarioService.listar.mockResolvedValue([
          { id: 2, nome: context.nome, senha: null },
        ]);
        const { findByText } = renderWithContext(context);

        const row = await findByText(context.nome);
        fireEvent.click(row);
        const botaoExcluir = (await findByText('Excluir')).parentElement;

        expect(botaoExcluir).toBeDisabled();
      });

      it('deve estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
        UsuarioService.listar.mockResolvedValue([usuarioSobTest]);

        const { findByText } = renderWithContext(context);
        const row = await findByText(usuarioSobTest.nome);
        fireEvent.click(row);

        const botaoExcluir = (await findByText('Excluir')).parentElement;

        expect(botaoExcluir).not.toBeDisabled();
      });
    });

    describe('Ao clicar no botão excluir', () => {
      it('deve chamar a função excluir, limpar o usuario selecionado e chamar a função listar', async () => {
        UsuarioService.listar = jest.fn();
        UsuarioService.listar.mockResolvedValue([usuarioSobTest]);
        UsuarioService.excluir = jest.fn(() => Promise.resolve({ data: {} }));

        const { findByText } = renderWithContext(context);
        const row = await findByText(usuarioSobTest.nome);
        fireEvent.click(row);

        const botaoExcluir = (await findByText('Excluir')).parentElement;
        fireEvent.click(botaoExcluir);

        await waitFor(() => {
          expect(UsuarioService.excluir).toHaveBeenCalledWith(usuarioSobTest);
          expect(UsuarioService.excluir).toHaveBeenCalledTimes(1);
        });

        expect(botaoExcluir).toBeDisabled();
        expect(UsuarioService.listar).toHaveBeenCalledTimes(2);
      });
    });
  });
});

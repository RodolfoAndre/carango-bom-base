import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Cadastro from './Cadastro';
import UsuarioService from '../../services/UsuarioService';

const handleOpenSnackbar = jest.fn();

describe('Testes de Cadastro', () => {
  describe('Testes de renderização e exibição', () => {
    beforeEach(() => {
      render(<Cadastro handleOpenSnackbar={handleOpenSnackbar} />);
    });

    it('Deve renderizar componente corretamente', () => {
      const tituloCadastro = screen.getByText('Cadastro');

      expect(tituloCadastro).toBeInTheDocument();
    });

    it('Deve exibir link para a página de Login', () => {
      const linkLogin = screen.getByRole('link', {
        name: 'Já possui conta? Entrar',
      });
      expect(linkLogin).toBeInTheDocument();
      expect(linkLogin).toHaveAttribute('href', '/login');
    });
  });

  describe('Testes de redirecionamento', () => {
    const history = createMemoryHistory();

    beforeEach(() => {
      history.push = jest.fn();

      render(
        <Router history={history}>
          <Cadastro handleOpenSnackbar={handleOpenSnackbar} />
        </Router>
      );
    });

    it('Deve redirecionar para tela de Login quando cadastro for realizado com sucesso', async () => {
      UsuarioService.cadastrar = jest.fn(() => Promise.resolve({ data: {} }));
      const usuario = screen.getByTestId('usuario');
      const senha = screen.getByTestId('senha');
      const confirmarSenha = screen.getByTestId('confirmarSenha');
      const botaoCadastro = screen.getByRole('button', { name: 'Cadastrar' });

      fireEvent.change(usuario, {
        target: { value: 'alejandro' },
      });

      fireEvent.change(senha, { target: { value: 'thefamemonster' } });
      fireEvent.change(confirmarSenha, { target: { value: 'thefamemonster' } });

      fireEvent.click(botaoCadastro);

      await waitFor(() =>
        expect(UsuarioService.cadastrar).toHaveBeenCalledWith({
          nome: 'alejandro',
          senha: 'thefamemonster',
        })
      );
      expect(history.push).toHaveBeenCalledWith('/login');
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });
});

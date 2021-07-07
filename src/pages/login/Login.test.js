import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Login from './Login';
import AutenticacaoService from '../../services/AutenticacaoService';

describe('Testes de Login', () => {
  describe('Testes de renderização e exibição', () => {
    beforeEach(() => {
      render(<Login />);
    });

    it('Deve renderizar componente corretamente', () => {
      const usuarioInput = screen.getByRole('textbox', { name: 'Usuário' });
      const senhaInput = screen.getByText('Senha');
      const botaoEntrar = screen.getByRole('button', { name: 'Entrar' });

      expect(usuarioInput).toBeInTheDocument();
      expect(senhaInput).toBeInTheDocument();

      expect(botaoEntrar).toBeInTheDocument();
    });

    it('Deve exibir link para a página de Cadastro', () => {
      const linkCadastro = screen.getByRole('link', {
        name: 'Não possui conta? Cadastrar',
      });
      expect(linkCadastro).toBeInTheDocument();
      expect(linkCadastro).toHaveAttribute('href', '/cadastro');
    });
  });

  describe('Testes de habilitar/desabilitar botão de Entrar', () => {
    beforeEach(() => {
      render(<Login />);
    });

    describe('Deve desabilitar botão de Entrar quando', () => {
      it('Usuário for inválido', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');

        fireEvent.change(usuario, {
          target: { value: 'ale' },
        });

        fireEvent.change(senha, { target: { value: 'thefamemonster' } });
        expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
      });

      it('Senha for inválida', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');

        fireEvent.change(usuario, {
          target: { value: 'alejandro' },
        });

        fireEvent.change(senha, { target: { value: 'the' } });

        expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
      });
    });

    describe('Deve habilitar botão de Entrar quando', () => {
      it('Os campos estiverem preenchidos corretamente ', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');

        fireEvent.change(usuario, {
          target: { value: 'alejandro' },
        });

        fireEvent.change(senha, { target: { value: 'thefamemonster' } });

        expect(
          screen.getByRole('button', { name: 'Entrar' })
        ).not.toBeDisabled();
      });
    });
  });

  describe('Testes de redirecionamento', () => {
    const history = createMemoryHistory();

    beforeEach(() => {
      history.push = jest.fn();
      const handleChangedLogin = jest.fn();

      render(
        <Router history={history}>
          <Login handleChangeLogin={handleChangedLogin} />
        </Router>
      );
    });

    it('Deve redirecionar para Home quando login for realizado com sucesso', async () => {
      AutenticacaoService.autenticar = jest.fn(() =>
        Promise.resolve({ data: {} })
      );
      const usuario = screen.getByTestId('usuario');
      const senha = screen.getByTestId('senha');
      const botaoEntrar = screen.getByRole('button', { name: 'Entrar' });

      fireEvent.change(usuario, {
        target: { value: 'alejandro' },
      });

      fireEvent.change(senha, { target: { value: 'thefamemonster' } });

      fireEvent.click(botaoEntrar);

      await waitFor(() =>
        expect(AutenticacaoService.autenticar).toHaveBeenLastCalledWith({
          nome: 'alejandro',
          senha: 'thefamemonster',
        })
      );
      expect(history.push).toHaveBeenCalledWith('/');
      expect(history.push).toHaveBeenCalledTimes(1);
    });
  });
});

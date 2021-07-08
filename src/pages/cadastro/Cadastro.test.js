import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Cadastro from './Cadastro';
import UsuarioService from '../../services/UsuarioService';

describe('Testes de Cadastro', () => {
  describe('Testes de renderização e exibição', () => {
    beforeEach(() => {
      render(<Cadastro />);
    });

    it('Deve renderizar componente corretamente', () => {
      const usuarioInput = screen.getByRole('textbox', { name: 'Usuário' });
      const senhaInput = screen.getByText('Senha');
      const confirmarSenhaInput = screen.getByText('Confirmar senha');
      const botaoCadastrar = screen.getByRole('button', { name: 'Cadastrar' });

      expect(usuarioInput).toBeInTheDocument();
      expect(senhaInput).toBeInTheDocument();
      expect(confirmarSenhaInput).toBeInTheDocument();

      expect(botaoCadastrar).toBeInTheDocument();
    });

    it('Deve exibir link para a página de Login', () => {
      const linkLogin = screen.getByRole('link', {
        name: 'Já possui conta? Entrar',
      });
      expect(linkLogin).toBeInTheDocument();
      expect(linkLogin).toHaveAttribute('href', '/login');
    });
  });

  describe('Testes de habilitar/desabilitar botão de Cadastro', () => {
    beforeEach(() => {
      render(<Cadastro />);
    });

    describe('Deve desabilitar botão de Cadastrar quando', () => {
      it('Usuário for inválido', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');

        fireEvent.change(usuario, {
          target: { value: 'ale' },
        });

        fireEvent.change(senha, { target: { value: 'thefamemonster' } });
        expect(
          screen.getByRole('button', { name: 'Cadastrar' })
        ).toBeDisabled();
      });

      it('Senha for inválida', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');

        fireEvent.change(usuario, {
          target: { value: 'alejandro' },
        });

        fireEvent.change(senha, { target: { value: 'the' } });
        expect(
          screen.getByRole('button', { name: 'Cadastrar' })
        ).toBeDisabled();
      });

      it('Senhas forem diferentes', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');
        const confirmarSenha = screen.getByTestId('confirmarSenha');

        fireEvent.change(usuario, {
          target: { value: 'alejandro' },
        });

        fireEvent.change(senha, { target: { value: 'thefamemonster' } });
        fireEvent.change(confirmarSenha, { target: { value: 'thefame' } });

        expect(
          screen.getByRole('button', { name: 'Cadastrar' })
        ).toBeDisabled();
      });
    });

    describe('Deve habilitar o botão de Cadastrar quando', () => {
      it('Os campos estiverem preenchidos corretamente ', () => {
        const usuario = screen.getByTestId('usuario');
        const senha = screen.getByTestId('senha');
        const confirmarSenha = screen.getByTestId('confirmarSenha');

        fireEvent.change(usuario, {
          target: { value: 'alejandro' },
        });

        fireEvent.change(senha, { target: { value: 'thefamemonster' } });
        fireEvent.change(confirmarSenha, {
          target: { value: 'thefamemonster' },
        });

        expect(
          screen.getByRole('button', { name: 'Cadastrar' })
        ).not.toBeDisabled();
      });
    });
  });

  describe('Testes de redirecionamento', () => {
    const history = createMemoryHistory();

    beforeEach(() => {
      history.push = jest.fn();

      render(
        <Router history={history}>
          <Cadastro />
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

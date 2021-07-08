import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import LoginFormComponent from './LoginFormComponent';

describe('Testes de LoginFormComponent', () => {
  describe('Testes com o modo login', () => {
    const handleChangeLogin = jest.fn();
    beforeEach(() => {
      render(
        <LoginFormComponent
          modo={'login'}
          handleChangeLogin={handleChangeLogin}
        />
      );
    });

    it('Deve renderizar componente corretamente', () => {
      const usuarioInput = screen.getByRole('textbox', { name: 'Usuário' });
      const senhaInput = screen.getByText('Senha');
      const botaoEntrar = screen.getByRole('button', { name: 'Entrar' });

      expect(usuarioInput).toBeInTheDocument();
      expect(senhaInput).toBeInTheDocument();

      expect(botaoEntrar).toBeInTheDocument();
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

  describe('Testes com o modo cadastrar', () => {
    const handleChangeLogin = jest.fn();
    beforeEach(() => {
      render(
        <LoginFormComponent
          modo={'cadastrar'}
          handleChangeLogin={handleChangeLogin}
        />
      );
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
});

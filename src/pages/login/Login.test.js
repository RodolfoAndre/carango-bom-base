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
      const tituloLogin = screen.getByText('Login');

      expect(tituloLogin).toBeInTheDocument();
    });

    it('Deve exibir link para a página de Cadastro', () => {
      const linkCadastro = screen.getByRole('link', {
        name: 'Não possui conta? Cadastrar',
      });
      expect(linkCadastro).toBeInTheDocument();
      expect(linkCadastro).toHaveAttribute('href', '/cadastro');
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

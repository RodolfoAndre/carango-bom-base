import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import AlterarSenha from './AlterarSenha';
import UsuarioService from '../../services/UsuarioService';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';

jest.mock('../../services/UsuarioService');

const history = createMemoryHistory();

describe('Testes do componente AlterarSenha', () => {
  describe('Teste de renderização e exibição', () => {
    beforeEach(() => {
      render(
        <Router history={history}>
          <UsuarioAutenticado.Provider
            value={{ id: 1, nome: 'alejandro', token: 'thisisatoken' }}
          >
            <AlterarSenha />
          </UsuarioAutenticado.Provider>
        </Router>
      );
      UsuarioService.alterarSenha.mockResolvedValue([]);
    });

    const usuarioSobTest = {
      id: 1,
      nome: 'alejandro',
      senha: 'alealejandro',
    };

    it('Deve renderizar componente corretamente', () => {
      const tituloAlterarSenha = screen.getByText('Alterar Senha');
      expect(tituloAlterarSenha).toBeInTheDocument();
    });

    it('Deve redirecionar para Home ao alterar uma senha corretamente', async () => {
      UsuarioService.alterarSenha = jest.fn(() =>
        Promise.resolve({ data: {} })
      );

      history.push = jest.fn();

      const senha = screen.getByTestId('senha');
      const confirmarSenha = screen.getByTestId('confirmarSenha');
      const botaoAlterar = screen.getByRole('button', { name: 'Alterar' });

      fireEvent.change(senha, {
        target: { value: 'thefamemonster' },
      });

      fireEvent.change(confirmarSenha, { target: { value: 'thefamemonster' } });
      fireEvent.click(botaoAlterar);

      await waitFor(() => {
        expect(UsuarioService.alterarSenha).toHaveBeenCalledWith({
          id: usuarioSobTest.id,
          nome: usuarioSobTest.nome,
          senha: 'thefamemonster',
        });
        expect(UsuarioService.alterarSenha).toHaveBeenCalledTimes(1);
        expect(history.push).toHaveBeenCalledWith('/');
      });
    });
  });
});

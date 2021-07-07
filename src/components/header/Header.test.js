import React from 'react';
import { Router } from 'react-router-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import Header from './Header';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';

describe('Testes do componente Header', () => {
  const history = createMemoryHistory();
  history.push = jest.fn();

  beforeEach(() => {
    render(
      <Router history={history}>
        <Header />
      </Router>
    );
  });

  describe('Testes de renderização e exibição', () => {
    describe('Com o usuário não logado', () => {
      it('Deve renderizar componente corretamente', () => {
        const tituloHeader = screen.getByRole('heading', {
          name: 'Carango Bom',
        });
        const linkLogin = screen.getByRole('button', { name: 'Login' });
        const menu = screen.getByLabelText('pages-menu');

        expect(tituloHeader).toBeInTheDocument();
        expect(linkLogin).toBeInTheDocument();
        expect(menu).toBeInTheDocument();
      });

      it('Deve exibir opções corretamente ao clicar no menu', () => {
        const menu = screen.getByLabelText('pages-menu');
        const opcaoVeiculos = screen.getByText('Veículos');

        fireEvent.click(menu);

        expect(opcaoVeiculos).toBeInTheDocument();
      });
    });
  });

  describe('Testes de redirecionamento', () => {
    describe('Testes da Home e Login', () => {
      it('Deve redirecionar para a Home ao clicar no título', () => {
        const tituloHeader = screen.getByRole('heading', {
          name: 'Carango Bom',
        });

        fireEvent.click(tituloHeader);

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      it('Deve redirecionar para a tela de Login ao clicar no botão Login', () => {
        const linkLogin = screen.getByRole('button', { name: 'Login' });

        fireEvent.click(linkLogin);

        expect(history.push).toHaveBeenCalledWith('/login');
        expect(history.push).toHaveBeenCalledTimes(1);
      });
    });

    describe('Testes dos itens do menu', () => {
      beforeEach(() => {
        const menu = screen.getByLabelText('pages-menu');
        fireEvent.click(menu);
      });

      it('Deve redirecionar para a página de listagem de veículos ao clicar na opção Veículos', () => {
        const opcaoVeiculos = screen.getByText('Veículos');

        fireEvent.click(opcaoVeiculos);

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.push).toHaveBeenCalledTimes(1);
      });

      describe('Com o usuário logado', () => {
        beforeEach(() => {
          render(
            <UsuarioAutenticado.Provider
              value={{ nome: 'admin', token: 'thisisavalidtoken' }}
            >
              <Router history={history}>
                <Header />
              </Router>
            </UsuarioAutenticado.Provider>
          );
        });

        it('Deve redirecionar para a página de listagem de marcas ao clicar na opção Marcas', () => {
          const opcaoMarcas = screen.getByText('Marcas');

          fireEvent.click(opcaoMarcas);

          expect(history.push).toHaveBeenCalledWith('/listar-marcas');
          expect(history.push).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});

import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from './App';

const history = createMemoryHistory();
history.push = jest.fn();

describe('Component App', () => {
  describe('Usuário não logado', () => {
    beforeEach(() => {
      render(
        <Router history={history}>
          <App />
        </Router>
      );
    });

    it('Ao entrar na aplicação, carrega a homepage com a lista de veículos', () => {
      expect(history.location.pathname).toBe('/');
      expect(screen.getByText('Lista de veículos'));
    });
  });

  describe('Usuário logado', () => {});
});

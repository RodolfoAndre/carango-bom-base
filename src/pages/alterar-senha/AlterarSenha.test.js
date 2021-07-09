import React from 'react';
import { render, screen } from '@testing-library/react';

import AlterarSenha from './AlterarSenha';

describe('Testes do componente AlterarSenha', () => {
  describe('Teste de renderização e exibição', () => {
    beforeEach(() => {
      render(<AlterarSenha />);
    });

    it('Deve renderizar componente corretamente', () => {
      const tituloAlterarSenha = screen.getByText('Alterar Senha');
      expect(tituloAlterarSenha).toBeInTheDocument();
    });
  });
});

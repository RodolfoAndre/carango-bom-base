import React from 'react';
import { render, screen } from '@testing-library/react';

import Dashboard from './Dashboard';

describe('Testes do componente Dashboard', () => {
  beforeEach(() => {
    render(<Dashboard />);
  });

  it('Deve renderizar o componente corretamente', () => {
    const tituloPagina = screen.getByRole('heading', { name: 'Dashboard' });
    expect(tituloPagina).toBeInTheDocument();
  });
});

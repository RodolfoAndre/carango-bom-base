import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Login from './Login';

describe('Testes de Login', () => {
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

  it('Deve desabilitar botão de Entrar quando senha for inválida', () => {
    const usuario = screen.getByTestId('usuario');
    const senha = screen.getByTestId('senha');

    fireEvent.change(usuario, {
      target: { value: 'alejandro' },
    });

    fireEvent.change(senha, { target: { value: 'the' } });

    expect(screen.getByRole('button', { name: 'Entrar' })).toBeDisabled();
  });

  it('Deve habilitar botão de Entrar quando os campos estiverem preenchidos corretamente ', () => {
    const usuario = screen.getByTestId('usuario');
    const senha = screen.getByTestId('senha');

    fireEvent.change(usuario, {
      target: { value: 'alejandro' },
    });

    fireEvent.change(senha, { target: { value: 'thefamemonster' } });

    expect(screen.getByRole('button', { name: 'Entrar' })).not.toBeDisabled();
  });

  it('Deve exibir link para a página de Cadastro', () => {
    const linkCadastro = screen.getByRole('link', {
      name: 'Não possui conta? Cadastrar',
    });
    expect(linkCadastro).toBeInTheDocument();
  });
});

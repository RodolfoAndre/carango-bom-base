import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Cadastro from './Cadastro';

describe('Testes de Login', () => {
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

  it('Deve desabilitar botão de Cadastrar quando senhas forem diferentes', () => {
    const usuario = screen.getByTestId('usuario');
    const senha = screen.getByTestId('senha');
    const confirmarSenha = screen.getByTestId('confirmarSenha');

    fireEvent.change(usuario, {
      target: { value: 'alejandro' },
    });

    fireEvent.change(senha, { target: { value: 'thefamemonster' } });
    fireEvent.change(confirmarSenha, { target: { value: 'thefame' } });

    expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeDisabled();
  });

  it('Deve habilitar botão de Cadastrar quando os campos estiverem preenchidos corretamente ', () => {
    const usuario = screen.getByTestId('usuario');
    const senha = screen.getByTestId('senha');
    const confirmarSenha = screen.getByTestId('confirmarSenha');

    fireEvent.change(usuario, {
      target: { value: 'alejandro' },
    });

    fireEvent.change(senha, { target: { value: 'thefamemonster' } });
    fireEvent.change(confirmarSenha, { target: { value: 'thefamemonster' } });

    expect(
      screen.getByRole('button', { name: 'Cadastrar' }),
    ).not.toBeDisabled();
  });

  it('Deve exibir link para a página de Login', () => {
    const linkLogin = screen.getByRole('link', {
      name: 'Já possui conta? Entrar',
    });
    expect(linkLogin).toBeInTheDocument();
    expect(linkLogin).toHaveAttribute('href', '/');
  });
});

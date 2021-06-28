import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import CadastroMarca from './CadastroMarca';
import MarcaService from '../../services/MarcaService';

jest.mock('../../services/MarcaService');

const renderWithRouter = (history, path) => {
  return render(
    <Router history={history}>
      <Route component={CadastroMarca} path={path} />
    </Router>
  );
};

// TODO revisar quando tivermos implementado a feature de autenticação
describe('Component de CadastroMarca', () => {
  beforeEach(() => {
    MarcaService.consultar.mockResolvedValue({});
  });

  const path = '/cadastro-marca';
  const history = createMemoryHistory({ initialEntries: [path] });

  it('O component deve sempre exibir o campo de marca', async () => {
    const { findByText } = renderWithRouter(history, path);

    expect(await findByText('Marca')).toBeInTheDocument();
  });

  it('O component deve sempre exibir o botão de cancelar', async () => {
    const { findByText } = renderWithRouter(history, path);

    expect(await findByText('Cancelar')).toBeInTheDocument();
  });

  it('Quando aperto o botão de cancelar, o component deve voltar para a página anterior', async () => {
    history.goBack = jest.fn();
    const { findByText } = renderWithRouter(history, path);

    const botaoCancelar = (await findByText('Cancelar')).parentElement;
    fireEvent.click(botaoCancelar);

    expect(history.goBack).toHaveBeenCalled();
  });

  describe('Página de cadastro', () => {
    it('Quando acesso /cadastro-marca, estou na página de cadastro', async () => {
      const { findByText } = renderWithRouter(history, path);

      expect(await findByText('Cadastrar')).toBeInTheDocument();
    });

    it('Quando tento cadastrar uma marca inválida, o botão de cadastrar deve estar desabilitado', async () => {
      const { findByText, getByTestId } = renderWithRouter(history, path);

      const botaoCadastrar = (await findByText('Cadastrar')).parentElement;
      const nomeInput = getByTestId('marca').childNodes[1].firstChild;
      fireEvent.change(nomeInput, { target: { value: 'Au' } });
      fireEvent.focusOut(nomeInput);

      expect(botaoCadastrar).toBeDisabled();
    });

    it('Quando tento cadastrar uma marca válida, o component deve chamar a função cadastrar e voltar para a página anterior', async () => {
      MarcaService.cadastrar = jest.fn(() => Promise.resolve({ data: {} }));
      history.goBack = jest.fn();
      const { findByText, getByTestId } = renderWithRouter(history, path);

      const botaoCadastrar = (await findByText('Cadastrar')).parentElement;
      const nomeInput = getByTestId('marca').childNodes[1].firstChild;
      fireEvent.change(nomeInput, { target: { value: 'Audi' } });
      fireEvent.click(botaoCadastrar);

      await waitFor(() =>
        expect(MarcaService.cadastrar).toHaveBeenCalledWith({ nome: 'Audi' })
      );
      expect(history.goBack).toHaveBeenCalled();
    });
  });

  describe('Página de alteração', () => {
    beforeEach(() => {
      MarcaService.consultar.mockResolvedValue({ id: 34, nome: 'FORD' });
    });

    const path = '/alteracao-marca';
    const history = createMemoryHistory({ initialEntries: [`${path}/34`] });

    it('Quando acesso /alteracao-marca/:id, estou na página de alteração', async () => {
      history.goBack = jest.fn();
      const { findByText } = renderWithRouter(history, `${path}/:id`);

      expect(await findByText('Alterar')).toBeInTheDocument();
    });

    it('Quando tento alterar a marca FORD, seu nome aparece no campo', async () => {
      history.goBack = jest.fn();
      const { findByDisplayValue } = renderWithRouter(history, `${path}/:id`);

      expect(await findByDisplayValue('FORD')).toBeInTheDocument();
    });

    describe('Quando tento alterar uma marca', () => {
      beforeEach(() => {
        MarcaService.alterar = jest.fn(() => Promise.resolve({ data: {} }));
      });

      it('com um nome inválido, o botão de alterar deve estar desabilitado', async () => {
        history.goBack = jest.fn();
        const { findByText, getByDisplayValue } = renderWithRouter(
          history,
          `${path}/:id`
        );

        const botaoAlterar = (await findByText('Alterar')).parentElement;
        const nomeInput = getByDisplayValue('FORD');
        fireEvent.change(nomeInput, { target: { value: 'Au' } });
        fireEvent.focusOut(nomeInput);

        expect(botaoAlterar).toBeDisabled();
      });

      it('com um nome válido, o component deve chamar a função alterar e voltar para a página anterior', async () => {
        history.goBack = jest.fn();
        const { findByText, getByDisplayValue } = renderWithRouter(
          history,
          `${path}/:id`
        );

        const botaoAlterar = (await findByText('Alterar')).parentElement;
        const nomeInput = getByDisplayValue('FORD');
        fireEvent.change(nomeInput, { target: { value: 'Audi' } });
        fireEvent.click(botaoAlterar);

        await waitFor(() =>
          expect(MarcaService.alterar).toHaveBeenCalledWith({
            id: '34',
            nome: 'Audi',
          })
        );
        expect(history.goBack).toHaveBeenCalled();
      });
    });
  });
});

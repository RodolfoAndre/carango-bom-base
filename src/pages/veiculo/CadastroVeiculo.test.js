import React from 'react';
import { screen, fireEvent, render, waitFor } from '@testing-library/react';
import { Route, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import CadastroVeiculo from './CadastroVeiculo';
import VeiculoService from '../../services/VeiculoService';
import MarcaService from '../../services/MarcaService';

jest.mock('../../services/VeiculoService');
jest.mock('../../services/MarcaService');
const handleOpenSnackbar = jest.fn();

const renderWithRouter = (history, path) => {
  return render(
    <Router history={history}>
      <Route path={path} exact>
        <CadastroVeiculo handleOpenSnackbar={handleOpenSnackbar} />
      </Route>
    </Router>
  );
};

const marcasLista = [{ nome: 'FORD', id: 1 }];

const veiculoSobTest = {
  id: 134,
  marca: 'FORD',
  modelo: 'KA 123456',
  ano: 2021,
  valor: 80000,
};

describe('Component de CadastroVeiculo', () => {
  beforeEach(() => {
    MarcaService.listar.mockResolvedValue(marcasLista);
  });

  const path = '/cadastro-veiculo';
  const history = createMemoryHistory({ initialEntries: [path] });

  it('Deve renderizar o componente corretamente', async () => {
    const { getByText } = renderWithRouter(history, path);

    await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());

    const marca = getByText('Marca');
    const modelo = screen.getByRole('textbox', { name: 'Modelo' });
    const ano = screen.getByRole('textbox', { name: 'Ano' });
    const valor = screen.getByRole('textbox', { name: 'Valor' });
    const botaoCancelar = screen.getByTestId('cancelar');
    const botaoCadastrar = screen.getByTestId('cadastrar-ou-alterar');

    expect(marca).toBeInTheDocument();
    expect(modelo).toBeInTheDocument();
    expect(ano).toBeInTheDocument();
    expect(valor).toBeInTheDocument();
    expect(botaoCancelar).toBeInTheDocument();
    expect(botaoCadastrar).toBeInTheDocument();
  });

  it('Deve abrir a página de cadastro corretamente', async () => {
    const { getByText } = renderWithRouter(history, path);
    await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
    expect(getByText('Cadastrar veículo')).toBeInTheDocument();
  });

  it('Ao clicar no botão de cancelar, deve voltar para a página anterior', async () => {
    history.goBack = jest.fn();
    const { getByTestId } = renderWithRouter(history, path);

    await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
    const botaoCancelar = getByTestId('cancelar');
    fireEvent.click(botaoCancelar);

    expect(history.goBack).toHaveBeenCalled();
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });

  it('Deve desabilitar botão de cadastrar quando o valor informado não for numérico', async () => {
    const { getByTestId } = renderWithRouter(history, path);

    await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
    const valor = screen.getByRole('textbox', { name: 'Valor' });
    const botaoCadastrar = getByTestId('cadastrar-ou-alterar');

    fireEvent.change(valor, { target: { value: 80000 } });
    expect(botaoCadastrar).not.toBeDisabled();
  });

  it('Deve desabilitar botão de cadastrar ao preencher algum campo incorretamente', async () => {
    const { getByTestId } = renderWithRouter(history, path);

    await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
    const botaoCadastrar = getByTestId('cadastrar-ou-alterar');
    const modelo = screen.getByRole('textbox', { name: 'Modelo' });

    fireEvent.change(modelo, { target: { value: '' } });
    fireEvent.focusOut(modelo);

    expect(botaoCadastrar).toBeDisabled();
  });

  it('Deve chamar a função cadastrar e voltar para a página anterior ao cadastrar um veículo válido', async () => {
    VeiculoService.cadastrar = jest.fn(() => Promise.resolve({ data: {} }));
    history.goBack = jest.fn();
    const { getByTestId } = renderWithRouter(history, path);

    const modelo = screen.getByRole('textbox', { name: 'Modelo' });
    const ano = screen.getByRole('textbox', { name: 'Ano' });
    const valor = screen.getByRole('textbox', { name: 'Valor' });
    const botaoCadastrar = getByTestId('cadastrar-ou-alterar');

    fireEvent.change(modelo, { target: { value: 'Q5 Sportback' } });
    fireEvent.change(ano, { target: { value: 2020 } });
    fireEvent.change(valor, { target: { value: 80000 } });
    fireEvent.click(botaoCadastrar);

    await waitFor(() =>
      expect(VeiculoService.cadastrar).toHaveBeenCalledWith({
        marca: '',
        modelo: 'Q5 Sportback',
        ano: '2020',
        valor: '80000',
      })
    );

    expect(history.goBack).toHaveBeenCalled();
    expect(history.goBack).toHaveBeenCalledTimes(1);
  });

  describe('Alteração de veículo', () => {
    beforeEach(() => {
      VeiculoService.consultar.mockResolvedValue(veiculoSobTest);
    });

    const path = '/alteracao-veiculo';
    const history = createMemoryHistory({
      initialEntries: [`${path}/${veiculoSobTest.id}`],
    });

    it('Deve abrir página de alteração de veículo corretamente', async () => {
      const { getByText } = renderWithRouter(history, `${path}/:id`);
      await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
      expect(getByText('Alterar veículo')).toBeInTheDocument();
    });

    it('Deve carregar página com os dados do veículo selecionado ao clicar no botão de alterar veículo', async () => {
      const { findByDisplayValue } = renderWithRouter(history, `${path}/:id`);

      const marca = await findByDisplayValue(veiculoSobTest.marca);
      const modelo = await findByDisplayValue(veiculoSobTest.modelo);
      const ano = await findByDisplayValue(veiculoSobTest.ano);
      const valor = await findByDisplayValue(veiculoSobTest.valor);

      expect(marca).toBeInTheDocument();
      expect(modelo).toBeInTheDocument();
      expect(ano).toBeInTheDocument();
      expect(valor).toBeInTheDocument();
    });

    it('Deve desabilitar botão de alterar ao preencher algum campo incorretamente', async () => {
      const { getByTestId } = renderWithRouter(history, `${path}/:id`);

      await waitFor(() => expect(MarcaService.listar).toHaveBeenCalled());
      const botaoAlterar = getByTestId('cadastrar-ou-alterar');
      const modelo = screen.getByRole('textbox', { name: 'Modelo' });

      fireEvent.change(modelo, { target: { value: '' } });
      fireEvent.focusOut(modelo);

      expect(botaoAlterar).toBeDisabled();
    });

    it('Deve chamar a função alterar e voltar para a página anterior ao alterar um veículo com sucesso', async () => {
      VeiculoService.alterar = jest.fn(() => Promise.resolve({ data: {} }));
      history.goBack = jest.fn();

      const { getByTestId } = renderWithRouter(history, `${path}/:id`);

      const modelo = screen.getByRole('textbox', { name: 'Modelo' });
      const ano = screen.getByRole('textbox', { name: 'Ano' });
      const valor = screen.getByRole('textbox', { name: 'Valor' });
      const botaoAlterar = getByTestId('cadastrar-ou-alterar');

      fireEvent.change(modelo, { target: { value: 'Q5 Sportback' } });
      fireEvent.change(ano, { target: { value: 2020 } });
      fireEvent.change(valor, { target: { value: 80000 } });
      fireEvent.click(botaoAlterar);

      await waitFor(() =>
        expect(VeiculoService.alterar).toHaveBeenCalledWith({
          id: veiculoSobTest.id.toString(),
          marca: '',
          modelo: 'Q5 Sportback',
          ano: '2020',
          valor: '80000',
        })
      );

      expect(history.goBack).toHaveBeenCalled();
      expect(history.goBack).toHaveBeenCalledTimes(1);
    });
  });
});

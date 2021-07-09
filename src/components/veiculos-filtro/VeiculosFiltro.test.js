import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import VeiculosFiltro from './VeiculosFiltro';

const marcas = [{ id: 1, nome: 'Chevrolet' }];
const modelos = [{ id: 1, modelo: 'Onix' }];
const handleChangeFiltro = jest.fn();

describe('Testes de VeiculosFiltro', () => {
  beforeEach(() => {
    render(
      <VeiculosFiltro
        marcasOpcoes={marcas}
        modelosOpcoes={modelos}
        handleChangeFiltro={handleChangeFiltro}
      />
    );
  });

  it('Deve renderizar select de marcas e modelos, input de preço máximo e mínimo e botões de limpar filtros e filtrar', () => {
    const selectMarcas = screen.getByTestId('marcas');
    const selectModelos = screen.getByTestId('modelos');
    const precoMin = screen.getByRole('textbox', { name: 'Preço Mínimo' });
    const precoMax = screen.getByRole('textbox', { name: 'Preço Máximo' });
    const botaoLimparFiltro = screen.getByTestId('limpar-filtros');
    const botaoFiltrar = screen.getByTestId('filtrar');

    expect(selectMarcas).toBeInTheDocument();
    expect(selectModelos).toBeInTheDocument();
    expect(precoMin).toBeInTheDocument();
    expect(precoMax).toBeInTheDocument();
    expect(botaoLimparFiltro).toBeInTheDocument();
    expect(botaoFiltrar).toBeInTheDocument();
  });

  describe('Teste com campos de filtro vazios', () => {
    it('Botão de limpar filtros deve estar desabilitado', () => {
      const botaoLimparFiltro = screen.getByTestId('limpar-filtros');
      expect(botaoLimparFiltro).toBeDisabled();
    });

    it('Botão de filtrar deve estar desabilitado', () => {
      const botaoFiltrar = screen.getByTestId('filtrar');
      expect(botaoFiltrar).toBeDisabled();
    });
  });

  describe('Teste com campos de filtro preenchidos', () => {
    beforeEach(() => {
      const precoMin = screen.getByRole('textbox', { name: 'Preço Mínimo' });
      const precoMax = screen.getByRole('textbox', { name: 'Preço Máximo' });
      fireEvent.change(precoMin, { target: { value: '0' } });
      fireEvent.change(precoMax, { target: { value: '90000' } });
    });

    it('Botão de limpar filtros deve estar habilitado', () => {
      const botaoLimparFiltro = screen.getByTestId('limpar-filtros');
      expect(botaoLimparFiltro).not.toBeDisabled();
    });

    it('Botão de filtrar deve limpar os valores do filtro', () => {
      const botaoFiltrar = screen.getByTestId('filtrar');
      expect(botaoFiltrar).not.toBeDisabled();
    });

    it('Botão de limpar filtros deve limpar os valores do filtro', () => {
      const botaoLimparFiltro = screen.getByTestId('limpar-filtros');
      fireEvent.click(botaoLimparFiltro);

      expect(handleChangeFiltro).toHaveBeenCalledTimes(1);
      expect(handleChangeFiltro).toHaveBeenCalledWith(null);
    });

    it('Botão de filtrar deve enviar objeto com valores dos filtros', () => {
      const botaoFiltrar = screen.getByTestId('filtrar');
      fireEvent.click(botaoFiltrar);

      expect(handleChangeFiltro).toHaveBeenCalledTimes(1);
      expect(handleChangeFiltro).toHaveBeenCalledWith({
        marcas: [],
        modelos: [],
        precoMinimo: 0,
        precoMaximo: 90000,
      });
    });
  });
});

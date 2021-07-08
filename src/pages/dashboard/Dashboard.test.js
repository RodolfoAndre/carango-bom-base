import React from 'react';
import { render } from '@testing-library/react';

import DashboardService from '../../services/DashboardService';
import Dashboard from './Dashboard';

jest.mock('../../services/DashboardService');

const createRender = () => {
  return render(<Dashboard />);
};

describe('Testes do componente Dashboard', () => {
  beforeEach(() => {
    DashboardService.listar.mockResolvedValue([]);
  });

  const veiculoSobTest = {
    marca: 'Volkswagen',
    numeroDeVeiculos: 1,
    valorTotal: 20000.0,
    modelos: [
      {
        modelo: 'Fox',
        numeroDeVeiculos: 1,
        valorTotal: 20000.0,
      },
    ],
  };

  it('Deve renderizar o componente corretamente', async () => {
    DashboardService.listar.mockResolvedValue([veiculoSobTest]);

    const { findByText, findByTestId } = createRender();

    const tituloPagina = await findByTestId('titulo-pagina');
    const marca = await findByText(veiculoSobTest.marca);
    const numeroDeVeiculos = await findByTestId('numero-veiculos');
    const valorTotal = await findByTestId('valor-veiculo');
    const modelo = await findByText(veiculoSobTest.modelos[0].modelo);
    const modeloValorTotal = await findByTestId('valor-modelo-0');
    const modeloNumeroDeVeiculos = await findByTestId('veiculo-modelo-0');

    expect(tituloPagina).toBeInTheDocument();
    expect(marca).toBeInTheDocument();
    expect(numeroDeVeiculos).toBeInTheDocument();
    expect(valorTotal).toBeInTheDocument();
    expect(modelo).toBeInTheDocument();
    expect(modeloValorTotal).toBeInTheDocument();
    expect(modeloNumeroDeVeiculos).toBeInTheDocument();
  });

  it('Deve exibir aviso de nenhum veículo encontrado caso não exista veículo cadastrado', async () => {
    DashboardService.listar.mockResolvedValue(null);

    const { findByTestId } = createRender();

    const veiculoNaoEncontrado = await findByTestId('nao-encontrado');
    expect(veiculoNaoEncontrado).toBeInTheDocument();
  });
});

import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import ListagemVeiculos from './ListagemVeiculos';
import VeiculoService from '../../services/VeiculoService';

jest.mock('../../services/VeiculoService');

const createRender = () => {
  return render(<ListagemVeiculos />);
};

describe('Component de ListagemVeiculos', () => {
  describe('Quando entrar na página', () => {
    it('deve exibir datagrid', async () => {
      VeiculoService.listar.mockResolvedValue([]);
      const { findByRole } = createRender();
      expect(await findByRole('grid')).toBeInTheDocument();
    });

    it('datagrid deve exibir colunas de marca, modelo, ano e valor', async () => {
      VeiculoService.listar.mockResolvedValue([]);
      const { getByText, findByText } = createRender();
      expect(await findByText('Marca')).toBeInTheDocument();
      expect(getByText('Modelo')).toBeInTheDocument();
      expect(getByText('Ano')).toBeInTheDocument();
      //expect(await findByText('Valor')).toBeInTheDocument();
    });

    it('datagrid deve exibir linha com valores de marca, modelo, ano e valor', async () => {
      VeiculoService.listar.mockResolvedValue([
        {
          id: 134,
          modelo: 'KA 123456',
          ano: 2021,
          valor: 80000.0,
          marca: 'FORD',
        },
      ]);
      const { findByText, getByText } = createRender();
      expect(await findByText('FORD')).toBeInTheDocument();
      expect(getByText('KA 123456')).toBeInTheDocument();
      expect(getByText('2021')).toBeInTheDocument();
      //expect(getByText('80000')).toBeInTheDocument();
    });
  });

  // TODO revisar quando tivermos implementado a feature de autenticação
  describe('Quando um usuário estiver logado', () => {
    it('Botão excluir deve ser exibido', async () => {
      VeiculoService.listar.mockResolvedValue([]);
      const { findByText } = createRender();
      expect(await findByText('Excluir')).toBeInTheDocument();
    });

    it('Botão excluir deve estar desabilitado caso nenhuma linha do DataGrid tenha sido selecionada', async () => {
      VeiculoService.listar.mockResolvedValue([]);
      const { findByText } = createRender();
      const botaoExcluir = (await findByText('Excluir')).parentElement;
      expect(botaoExcluir).toBeDisabled();
    });

    it('Botão excluir deve estar habilitado caso uma linha do DataGrid tenha sido selecionada', async () => {
      VeiculoService.listar.mockResolvedValue([
        {
          id: 134,
          modelo: 'KA 123456',
          ano: 2021,
          valor: 80000.0,
          marca: 'FORD',
        },
      ]);
      const { findByText } = createRender();
      const row = await findByText('FORD');
      fireEvent.click(row);

      const botaoExcluir = (await findByText('Excluir')).parentElement;
      expect(botaoExcluir).not.toBeDisabled();
    });
  });
});

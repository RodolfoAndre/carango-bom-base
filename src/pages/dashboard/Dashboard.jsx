import React, { useEffect, useState } from 'react';

import { Typography, Divider } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';

import { IconAvatar, PageTitle } from '../../assets/GlobalStyles.jsx';
import {
  DashboardContainer,
  CardContainer,
  CardHeader,
  CardContent,
  CarBrand,
  CarPrice,
  Bold,
  ModelTitle,
  CarModel,
  StyledDivider,
} from './styles.jsx';

import DashboardService from '../../services/DashboardService.js';

const Dashboard = () => {
  const [veiculos, setVeiculos] = useState([]);

  useEffect(() => {
    carregarVeiculos();
    return () => setVeiculos([]);
  }, []);

  const carregarVeiculos = () => {
    DashboardService.listar().then((dados) => {
      setVeiculos(dados);
    });
  };

  const formatarValorVeiculo = (valor) =>
    valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

  const veiculosDisponiveis = (quantidade) => {
    if (!quantidade) return 'Nenhum veículo disponível';
    if (quantidade === 1) return `${quantidade} veículo disponível`;
    return `${quantidade} veículos disponíveis`;
  };

  const renderizarModelos = (modelos) =>
    modelos.map((modelo, index) => (
      <div key={index}>
        <CarModel>{modelo.modelo}</CarModel>
        <CarPrice data-testid={`valor-modelo-${index}`}>
          {formatarValorVeiculo(modelo.valorTotal)}
        </CarPrice>
        <Typography
          color='textSecondary'
          data-testid={`veiculo-modelo-${index}`}
        >
          {veiculosDisponiveis(modelo.numeroDeVeiculos)}
        </Typography>
      </div>
    ));

  return (
    <>
      <PageTitle component='h2' variant='h4' data-testid='titulo-pagina'>
        Dashboard
      </PageTitle>
      <DashboardContainer>
        {veiculos?.length ? (
          veiculos.map((veiculo, index) => (
            <CardContainer key={index} variant='outlined'>
              <CardHeader>
                <IconAvatar>
                  <DirectionsCarIcon />
                </IconAvatar>
                <CarBrand component='h4' variant='h5'>
                  {veiculo?.marca}
                </CarBrand>
              </CardHeader>
              <Divider variant='middle' />
              <CardContent>
                <CarPrice>
                  <Bold>Valor total </Bold>
                  <br />
                  <Typography component='span' data-testid='valor-veiculo'>
                    {formatarValorVeiculo(veiculo.valorTotal)}
                  </Typography>
                </CarPrice>
                <Typography color='textSecondary' data-testid='numero-veiculos'>
                  {veiculosDisponiveis(veiculo.numeroDeVeiculos)}
                </Typography>
                <StyledDivider variant='fullWidth' />
                <ModelTitle component='h5' variant='h6'>
                  Modelos
                </ModelTitle>
                {renderizarModelos(veiculo.modelos)}
                <StyledDivider variant='middle' />
              </CardContent>
            </CardContainer>
          ))
        ) : (
          <Typography data-testid='nao-encontrado'>
            Nenhum veículo encontrado
          </Typography>
        )}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;

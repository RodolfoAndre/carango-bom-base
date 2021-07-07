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

  return (
    <>
      <PageTitle component='h2' variant='h4'>
        Dashboard
      </PageTitle>
      <DashboardContainer>
        {veiculos ? (
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
                <CarPrice>{formatarValorVeiculo(veiculo.valorTotal)}</CarPrice>
                <Typography mb={12} color='textSecondary'>
                  {veiculosDisponiveis(veiculo.numeroDeVeiculos)}
                </Typography>
              </CardContent>
            </CardContainer>
          ))
        ) : (
          <Typography>Nenhum veículo encontrado</Typography>
        )}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;

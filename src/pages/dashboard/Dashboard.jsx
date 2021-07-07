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

  return (
    <>
      <PageTitle component='h2' variant='h4'>
        Dashboard - Veículos
      </PageTitle>
      <DashboardContainer>
        {veiculos
          ? veiculos.map((veiculo, index) => (
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
                  <CarPrice>R$ {veiculo?.valorTotal}</CarPrice>
                  <Typography mb={12} color='textSecondary'>
                    {veiculo?.numeroDeVeiculos} veículos disponíveis
                  </Typography>
                </CardContent>
              </CardContainer>
            ))
          : null}
      </DashboardContainer>
    </>
  );
};

export default Dashboard;

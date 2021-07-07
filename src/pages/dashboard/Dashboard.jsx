import React from 'react';
import { Typography, Divider } from '@material-ui/core';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import { IconAvatar, PageTitle } from '../../assets/GlobalStyles.jsx';
import {
  CardContainer,
  CardHeader,
  CardContent,
  CarBrand,
  CarPrice,
} from './styles.jsx';

const Dashboard = () => (
  <>
    <PageTitle component='h2' variant='h4'>
      Dashboard
    </PageTitle>
    <CardContainer variant='outlined'>
      <CardHeader>
        <IconAvatar>
          <DirectionsCarIcon />
        </IconAvatar>
        <CarBrand component='h4' variant='h5'>
          Renault
        </CarBrand>
      </CardHeader>
      <Divider variant='middle' />
      <CardContent>
        <CarPrice>R$ 80.000,00</CarPrice>
        <Typography mb={12} color='textSecondary'>
          10 veículos disponíveis
        </Typography>
      </CardContent>
    </CardContainer>
  </>
);

export default Dashboard;

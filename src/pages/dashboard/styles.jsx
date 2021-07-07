import styled from 'styled-components';

import { Typography, Card } from '@material-ui/core';

export const DashboardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

export const CardContainer = styled(Card)`
  width: 250px;
  margin-right: 2em;
  margin-bottom: 2em;
  box-size: border-box;
`;

export const CardHeader = styled.div`
  display: flex;
`;

export const CardContent = styled.div`
  padding: 24px;
`;

export const CarBrand = styled(Typography)`
  margin: auto 16px;
`;

export const CarPrice = styled(Typography)`
  font-size: 18px;
`;

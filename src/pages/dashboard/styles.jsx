import styled from 'styled-components';

import { Typography, Card, Divider } from '@material-ui/core';

export const DashboardContainer = styled.section`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
`;

export const CardContainer = styled(Card)`
  width: 270px;
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

export const Bold = styled.span`
  font-weight: bold;
`;

export const ModelTitle = styled(Typography)`
  text-align: center;
`;

export const CarModel = styled(Typography)`
  font-size: 18px;
  font-weight: bold;
  margin-top: 24px;
`;

export const StyledDivider = styled(Divider)`
  margin: 24px 0;
`;

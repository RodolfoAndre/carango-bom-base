import styled from 'styled-components';

import { Typography, Card } from '@material-ui/core';

export const CardContainer = styled(Card)`
  max-width: 250px;
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

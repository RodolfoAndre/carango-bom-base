import styled from 'styled-components';

import { Typography } from '@material-ui/core';

export const FiltroWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 2em;
`;

export const FiltroTitle = styled(Typography)`
  float: left;
`;

export const FormFiltro = styled.form`
  width: 80%;
`;

import styled from 'styled-components';

import { IconButton, Typography } from '@material-ui/core';

export const StyledHeader = styled.header`
  flex-grow: 1;
`;

export const MenuButton = styled(IconButton)`
  margin-right: 16px;
`;

export const Title = styled(Typography)`
  flex-grow: 1;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

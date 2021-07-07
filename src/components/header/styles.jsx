import styled from 'styled-components';

import { IconButton, Typography, Button } from '@material-ui/core';

export const StyledHeader = styled.header`
  flex-grow: 1;
`;

export const MenuIconButton = styled(IconButton)`
  margin-right: 16px;
  color: #fff;
`;

export const Title = styled(Typography)`
  flex-grow: 1;
  text-align: center;

  &:hover {
    cursor: pointer;
  }
`;

export const MenuButton = styled(Button)`
  color: #fff;
`;

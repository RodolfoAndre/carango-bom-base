import styled from 'styled-components';

import { IconButton, Typography, Button } from '@material-ui/core';

export const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
`;

export const MenuIconButton = styled(IconButton)`
  margin-right: 16px;
  color: #fff;
`;

export const Title = styled(Typography)`
  flex-grow: 1;

  &:hover {
    cursor: pointer;
  }
`;

export const MenuButton = styled(Button)`
  color: #fff;
`;

import styled from 'styled-components';

import { Button, Fab } from '@material-ui/core';

export const MainContent = styled.main`
  height: 300px;
  width: 100%;
`;

export const ActionsToolbar = styled.div`
  float: right;
`;

export const ActionButton = styled(Button)`
  top: 10px;
  margin-left: 10px;
`;

export const StyledFab = styled(Fab)`
  position: absolute;
  bottom: 100px;
  right: 100px;
`;

import styled from 'styled-components';

import { Button, Fab, Avatar, Typography } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';

export const MainContent = styled.div`
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

  @media (max-width: 500px) {
    bottom: 50px;
    right: 50px;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

export const IconAvatar = styled(Avatar)`
  margin: 16px;
  background-color: #0d47a1;
`;

export const LoginForm = styled.form`
  margin-top: 16px;
  width: 100%;
`;

export const LoginButton = styled(Button)`
  margin: 24px 0 16px;
`;

export const PageTitle = styled(Typography)`
  margin-top: 16px;
  margin-bottom: 42px;
  text-align: center;
`;

export const StyledDataGrid = styled(DataGrid)`
  background-color: #fff;
`;

import styled from 'styled-components';

import { Button, Fab, Avatar } from '@material-ui/core';

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

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 64px;
`;

export const LoginAvatar = styled(Avatar)`
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

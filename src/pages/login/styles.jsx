import styled from 'styled-components';

import { Avatar, Button } from '@material-ui/core';

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

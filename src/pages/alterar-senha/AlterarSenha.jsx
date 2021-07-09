import React from 'react';
import { useHistory } from 'react-router';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CssBaseline, Container, Typography } from '@material-ui/core';

import { LoginContainer, IconAvatar } from '../../assets/GlobalStyles';

import LoginFormComponent from '../../components/login-form/LoginFormComponent';
import UsuarioService from '../../services/UsuarioService';

const AlterarSenha = () => {
  const history = useHistory();

  const alterarSenha = (usuario, possoEnviar) => {
    if (possoEnviar()) {
      UsuarioService.alterarSenha(usuario).then(() => {
        history.push('/');
      });
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <LoginContainer>
        <IconAvatar>
          <LockOutlinedIcon />
        </IconAvatar>
        <Typography component='h1' variant='h5'>
          Alterar Senha
        </Typography>
        <LoginFormComponent modo={'alterar'} handleChangeForm={alterarSenha} />
      </LoginContainer>
    </Container>
  );
};

export default AlterarSenha;

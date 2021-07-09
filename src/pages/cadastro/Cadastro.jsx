import React from 'react';
import { useHistory } from 'react-router';

import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { LoginContainer, IconAvatar } from '../../assets/GlobalStyles';

import LoginFormComponent from '../../components/login-form/LoginFormComponent';
import UsuarioService from '../../services/UsuarioService';

const Cadastro = () => {
  const history = useHistory();

  const cadastrar = (usuario, possoEnviar) => {
    console.log(document.cookie);
    if (possoEnviar()) {
      UsuarioService.cadastrar(usuario).then(() => {
        history.push('/login');
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
          Cadastro
        </Typography>
        <LoginFormComponent modo={'cadastrar'} handleChangeForm={cadastrar} />
        <Grid container>
          <Grid item>
            <Link href='/login'>Já possui conta? Entrar</Link>
          </Grid>
        </Grid>
      </LoginContainer>
    </Container>
  );
};

export default Cadastro;

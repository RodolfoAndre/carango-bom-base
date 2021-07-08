import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';

import AutenticacaoService from '../../services/AutenticacaoService';
import CustomLoginForm from '../../components/login-form/LoginForm';

import { LoginContainer, IconAvatar } from '../../assets/GlobalStyles';

const Login = ({ handleChangeLogin }) => {
  const history = useHistory();

  const logar = (usuario, possoEnviar) => {
    if (possoEnviar()) {
      AutenticacaoService.autenticar(usuario).then((response) => {
        if (!response?.error) {
          handleChangeLogin({
            nome: usuario.nome,
            token: response.token,
          });
          history.push('/');
        }
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
          Login
        </Typography>
        <CustomLoginForm modo={'login'} handleChangeForm={logar} />
        <Grid container>
          <Link href='/cadastro'>Não possui conta? Cadastrar</Link>
        </Grid>
      </LoginContainer>
    </Container>
  );
};

Login.propTypes = {
  handleChangeLogin: PropTypes.func,
};

export default Login;

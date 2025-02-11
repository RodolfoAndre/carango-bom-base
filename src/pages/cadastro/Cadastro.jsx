import React from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import {
  CssBaseline,
  Container,
  Typography,
  Grid,
  Link,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { LoginContainer, IconAvatar } from '../../assets/GlobalStyles';

import { SUCCESS_ALERT, ERROR_ALERT } from '../../Constants';

import LoginFormComponent from '../../components/login-form/LoginFormComponent';
import UsuarioService from '../../services/UsuarioService';

const Cadastro = ({ handleOpenSnackbar }) => {
  const history = useHistory();

  const cadastrar = (usuario, possoEnviar) => {
    if (possoEnviar()) {
      UsuarioService.cadastrar(usuario).then((response) => {
        if (response?.error) handleOpenSnackbar(response.message, ERROR_ALERT);
        else {
          handleOpenSnackbar('Cadastro realizado com sucesso', SUCCESS_ALERT);
          history.push('/login');
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

Cadastro.propTypes = {
  handleOpenSnackbar: PropTypes.func.isRequired,
};

export default Cadastro;

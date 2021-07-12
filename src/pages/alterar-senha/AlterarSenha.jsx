import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { CssBaseline, Container, Typography } from '@material-ui/core';

import { LoginContainer, IconAvatar } from '../../assets/GlobalStyles';

import { SUCCESS_ALERT, ERROR_ALERT } from '../../Constants';

import LoginFormComponent from '../../components/login-form/LoginFormComponent';
import UsuarioService from '../../services/UsuarioService';

const AlterarSenha = ({ handleOpenSnackbar }) => {
  const history = useHistory();

  const alterarSenha = (usuario, possoEnviar) => {
    if (possoEnviar()) {
      UsuarioService.alterarSenha(usuario).then((response) => {
        if (response?.error) handleOpenSnackbar(response.message, ERROR_ALERT);
        else {
          handleOpenSnackbar('Senha alterada com sucesso', SUCCESS_ALERT);
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
          Alterar Senha
        </Typography>
        <LoginFormComponent modo={'alterar'} handleChangeForm={alterarSenha} />
      </LoginContainer>
    </Container>
  );
};

AlterarSenha.propTypes = {
  handleOpenSnackbar: PropTypes.func,
};

export default AlterarSenha;

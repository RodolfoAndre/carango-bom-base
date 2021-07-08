import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {
  CssBaseline,
  Container,
  Typography,
  TextField,
  Grid,
  Link,
} from '@material-ui/core';

import useErros from '../../hooks/useErros';
import AutenticacaoService from '../../services/AutenticacaoService';

import {
  LoginContainer,
  LoginForm,
  LoginAvatar,
  LoginButton,
} from '../../assets/GlobalStyles';

const Login = ({ handleChangeLogin }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  const validacoes = {
    usuario: (usuario) => {
      if (!usuario.length) return { valido: false, texto: 'Campo obrigatório' };
      if (usuario.length <= 3)
        return {
          valido: false,
          texto: 'Usuário deve ter ao menos 4 caracteres',
        };
      return { valido: true };
    },

    senha: (senha) => {
      if (!senha || senha.length < 6)
        return { valido: false, texto: 'Senha deve ter ao menos 6 caracteres' };
      return { valido: true };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  const logar = (e) => {
    if (possoEnviar) {
      e.preventDefault();
      AutenticacaoService.autenticar({ nome: usuario, senha }).then(
        (response) => {
          if (!response?.error) {
            handleChangeLogin({
              nome: usuario,
              token: response.token,
            });
            history.push('/');
          }
        }
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <LoginContainer>
        <LoginAvatar>
          <LockOutlinedIcon />
        </LoginAvatar>
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <LoginForm onSubmit={(e) => logar(e)}>
          <TextField
            value={usuario}
            onBlur={validarCampos}
            onChange={(e) => {
              setUsuario(e.target.value);
              validarCampos(e);
            }}
            error={!erros.usuario.valido}
            helperText={erros.usuario.texto}
            variant="outlined"
            margin="normal"
            id="usuario"
            name="usuario"
            label="Usuário"
            type="text"
            inputProps={{ 'data-testid': 'usuario' }}
            fullWidth
            required
          />
          <TextField
            value={senha}
            onBlur={validarCampos}
            onChange={(e) => {
              setSenha(e.target.value);
              validarCampos(e);
            }}
            error={!erros.senha.valido}
            helperText={erros.senha.texto}
            variant="outlined"
            margin="normal"
            id="senha"
            name="senha"
            label="Senha"
            type="password"
            inputProps={{ 'data-testid': 'senha' }}
            fullWidth
            required
          />

          <LoginButton
            disabled={!possoEnviar()}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Entrar
          </LoginButton>
        </LoginForm>
        <Grid container>
          <Link href="/cadastro">Não possui conta? Cadastrar</Link>
        </Grid>
      </LoginContainer>
    </Container>
  );
};

Login.propTypes = {
  handleChangeLogin: PropTypes.func,
};

export default Login;

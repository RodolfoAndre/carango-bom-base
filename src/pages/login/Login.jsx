import React, { useState } from 'react';
import { useHistory } from 'react-router';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useErros from '../../hooks/useErros';

import {
  CssBaseline,
  Container,
  Typography,
  TextField,
  Grid,
  Link,
} from '@material-ui/core';

import { LoginContainer, LoginForm, LoginAvatar, LoginButton } from './styles';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const history = useHistory();

  const validacoes = {
    usuario: (usuario) => {
      if (!usuario.length) return { valido: false, texto: 'Campo obrigatório' };
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
      history.push('/listar-veiculos');
    }
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <LoginContainer>
        <LoginAvatar>
          <LockOutlinedIcon />
        </LoginAvatar>
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <LoginForm onSubmit={(e) => logar(e)}>
          <TextField
            value={usuario}
            onBlur={validarCampos}
            onChange={(e) => {
              setUsuario(e.target.value);
            }}
            error={!erros.usuario.valido}
            helperText={erros.usuario.texto}
            variant='outlined'
            margin='normal'
            id='usuario'
            name='usuario'
            label='Usuário'
            type='text'
            fullWidth
            required
          />
          <TextField
            value={senha}
            onBlur={validarCampos}
            onChange={(e) => {
              setSenha(e.target.value);
            }}
            error={!erros.senha.valido}
            helperText={erros.senha.texto}
            variant='outlined'
            margin='normal'
            id='senha'
            name='senha'
            label='Senha'
            type='password'
            fullWidth
            required
          />

          <LoginButton
            disabled={!possoEnviar()}
            type='submit'
            variant='contained'
            color='primary'
            fullWidth
          >
            Entrar
          </LoginButton>
        </LoginForm>
        <Grid container>
          <Grid item>
            <Link href='#'>Não possui conta? Cadastrar</Link>
          </Grid>
        </Grid>
      </LoginContainer>
    </Container>
  );
};

export default Login;

import React, { useState } from 'react';
import { useHistory } from 'react-router';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import useErros from '../../hooks/useErros';
import UsuarioService from '../../services/UsuarioService';

import {
  CssBaseline,
  Container,
  Typography,
  TextField,
  Grid,
  Link,
} from '@material-ui/core';

import {
  LoginContainer,
  LoginForm,
  IconAvatar,
  LoginButton,
} from '../../assets/GlobalStyles';

const Login = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

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

    confirmarSenha: (confirmarSenha) => {
      if (confirmarSenha !== senha)
        return { valido: false, texto: 'As senhas devem ser iguais' };
      return { valido: true };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  const cadastrar = (e) => {
    // TODO - Mostrar mensagem de cadastro com sucesso
    if (possoEnviar) {
      e.preventDefault();
      UsuarioService.cadastrar({ nome: usuario, senha }).then(() => {
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
        <LoginForm onSubmit={(e) => cadastrar(e)}>
          <TextField
            value={usuario}
            onBlur={validarCampos}
            onChange={(e) => {
              setUsuario(e.target.value);
              validarCampos(e);
            }}
            error={!erros.usuario.valido}
            helperText={erros.usuario.texto}
            variant='outlined'
            margin='normal'
            id='usuario'
            name='usuario'
            label='Usuário'
            type='text'
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
            variant='outlined'
            margin='normal'
            id='senha'
            name='senha'
            label='Senha'
            type='password'
            inputProps={{ 'data-testid': 'senha' }}
            fullWidth
            required
          />

          <TextField
            value={confirmarSenha}
            onBlur={validarCampos}
            onChange={(e) => {
              setConfirmarSenha(e.target.value);
              validarCampos(e);
            }}
            error={!erros.confirmarSenha.valido}
            helperText={erros.confirmarSenha.texto}
            variant='outlined'
            margin='normal'
            id='confirmarSenha'
            name='confirmarSenha'
            label='Confirmar senha'
            type='password'
            inputProps={{ 'data-testid': 'confirmarSenha' }}
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
            Cadastrar
          </LoginButton>
        </LoginForm>
        <Grid container>
          <Grid item>
            <Link href='/login'>Já possui conta? Entrar</Link>
          </Grid>
        </Grid>
      </LoginContainer>
    </Container>
  );
};

export default Login;

import React, { useState } from 'react';
import PropTypes from 'prop-types';

import useErros from '../../hooks/useErros';

import { TextField } from '@material-ui/core';
import { LoginForm, LoginButton } from '../../assets/GlobalStyles';

const CustomLoginForm = ({ modo, handleChangeForm }) => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const botaoLabelMap = {
    login: 'Entrar',
    cadastrar: 'Cadastrar',
    alterar: 'Alterar senha',
  };

  const validacoes = {
    usuario: (usuarioAValidar) => {
      if (!usuarioAValidar.length)
        return { valido: false, texto: 'Campo obrigatório' };
      if (usuarioAValidar.length <= 3)
        return {
          valido: false,
          texto: 'Usuário deve ter ao menos 4 caracteres',
        };
      return { valido: true };
    },

    senha: (senhaAValidar) => {
      if (!senhaAValidar || senhaAValidar.length < 6)
        return { valido: false, texto: 'Senha deve ter ao menos 6 caracteres' };
      return { valido: true };
    },

    confirmarSenha: (confirmarSenhaAValidar) => {
      if (confirmarSenhaAValidar !== senha)
        return { valido: false, texto: 'As senhas devem ser iguais' };
      return { valido: true };
    },
  };

  const [erros, validarCampos, possoEnviar] = useErros(validacoes);

  const wrapUsuario = (e) => {
    e.preventDefault();
    handleChangeForm({ nome: usuario, senha }, possoEnviar);
  };

  const renderConfirmarSenha = () => {
    if (modo !== 'login') {
      return (
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
      );
    }
  };

  return (
    <LoginForm onSubmit={(e) => wrapUsuario(e)}>
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

      {renderConfirmarSenha()}

      <LoginButton
        disabled={!possoEnviar()}
        type='submit'
        variant='contained'
        color='primary'
        fullWidth
      >
        {botaoLabelMap[modo]}
      </LoginButton>
    </LoginForm>
  );
};

CustomLoginForm.propTypes = {
  modo: PropTypes.string,
  handleChangeForm: PropTypes.func,
};

export default CustomLoginForm;

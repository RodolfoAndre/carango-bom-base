import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Container, CssBaseline, makeStyles } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { ptBR } from '@material-ui/core/locale';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from './components/header/Header';
import CadastroMarca from './pages/marca/CadastroMarca';
import ListagemMarcas from './pages/marca/ListagemMarcas';
import CadastroVeiculo from './pages/veiculo/CadastroVeiculo';
import ListagemVeiculos from './pages/veiculo/ListagemVeiculos';
import Login from './pages/login/Login';
import Cadastro from './pages/cadastro/Cadastro';
import Dashboard from './pages/dashboard/Dashboard';
import ListagemUsuarios from './pages/usuario/ListagemUsuarios';
import AlterarSenha from './pages/alterar-senha/AlterarSenha';

import PrivateRoute from './components/private-route/PrivateRoute';
import UsuarioAutenticado from './contexts/UsuarioAutenticado';
import SnackbarAlert from './components/snackbar/SnackbarAlert';
import { NAME_KEY, TOKEN_KEY, ID_USER_KEY } from './Constants';

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
  },
  ptBR
);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');

  const classes = useStyles();

  useEffect(() => {
    const nome = localStorage.getItem(NAME_KEY);
    const token = localStorage.getItem(TOKEN_KEY);
    const idUsuario = localStorage.getItem(ID_USER_KEY);
    if (nome && token) {
      setUsuarioAutenticado({ nome, token, idUsuario });
    }
  }, []);

  const handleChangeLogin = (novoLogin) => {
    if (novoLogin) {
      localStorage.setItem(NAME_KEY, novoLogin.nome);
      localStorage.setItem(TOKEN_KEY, novoLogin.token);
      localStorage.setItem(ID_USER_KEY, novoLogin.idUsuario);
    } else {
      localStorage.clear();
    }
    setUsuarioAutenticado(novoLogin);
  };

  const estaAutenticado = () => {
    return usuarioAutenticado?.token;
  };

  const handleOpenSnackbar = (snackbarMessage, snackbarSeverity) => {
    setMessage(snackbarMessage);
    setSeverity(snackbarSeverity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <UsuarioAutenticado.Provider value={usuarioAutenticado}>
        <Header handleChangeLogin={handleChangeLogin} />
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
            <Container component='article' maxWidth='md'>
              <SnackbarAlert
                isOpen={openSnackbar}
                message={message}
                severity={severity}
                handleClose={handleCloseSnackbar}
              />
              <Switch>
                <PrivateRoute
                  path='/cadastro-marca'
                  exact
                  component={
                    <CadastroMarca handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/alteracao-marca/:id'
                  exact
                  component={
                    <CadastroMarca handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/listar-marcas'
                  exact
                  component={
                    <ListagemMarcas handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/cadastro-veiculo'
                  exact
                  component={
                    <CadastroVeiculo handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/alteracao-veiculo/:id'
                  exact
                  component={
                    <CadastroVeiculo handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/dashboard'
                  exact
                  component={<Dashboard />}
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/listar-usuarios'
                  exact
                  component={
                    <ListagemUsuarios handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path='/alterar-senha/:id'
                  exact
                  component={
                    <AlterarSenha handleOpenSnackbar={handleOpenSnackbar} />
                  }
                  estaAutenticado={estaAutenticado}
                />
                <Route path='/' exact>
                  <ListagemVeiculos handleOpenSnackbar={handleOpenSnackbar} />
                </Route>
                <Route path='/login'>
                  <Login
                    handleChangeLogin={handleChangeLogin}
                    handleOpenSnackbar={handleOpenSnackbar}
                  />
                </Route>
                <Route path='/cadastro'>
                  <Cadastro handleOpenSnackbar={handleOpenSnackbar} />
                </Route>
              </Switch>
            </Container>
          </main>
        </div>
      </UsuarioAutenticado.Provider>
    </ThemeProvider>
  );
}

export default App;

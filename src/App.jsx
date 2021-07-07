import React, { useState } from 'react';
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
import UsuarioAutenticado from './contexts/UsuarioAutenticado';
import { NAME_KEY, TOKEN_KEY } from './Constants';
import PrivateRoute from './components/private-route/PrivateRoute';

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
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
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
  const classes = useStyles();

  const handleChangeLogin = (novoLogin) => {
    if (novoLogin) {
      localStorage.setItem(NAME_KEY, novoLogin.nome);
      localStorage.setItem(TOKEN_KEY, novoLogin.token);
    } else {
      localStorage.clear();
    }
    setUsuarioAutenticado(novoLogin);
  };

  const estaAutenticado = () => {
    return usuarioAutenticado?.token;
  };

  return (
    <ThemeProvider theme={muiTheme}>
      <UsuarioAutenticado.Provider value={usuarioAutenticado}>
        <Header handleChangeLogin={handleChangeLogin} />
        <div className={classes.root}>
          <CssBaseline />
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container component="article" maxWidth="md">
              <Switch>
                <PrivateRoute
                  path="/cadastro-marca"
                  exact
                  component={<CadastroMarca />}
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path="/alteracao-marca/:id"
                  exact
                  component={<CadastroMarca />}
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path="/listar-marcas"
                  exact
                  component={<ListagemMarcas />}
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path="/cadastro-veiculo"
                  exact
                  component={<CadastroVeiculo />}
                  estaAutenticado={estaAutenticado}
                />
                <PrivateRoute
                  path="/alteracao-veiculo/:id"
                  exact
                  component={<CadastroVeiculo />}
                  estaAutenticado={estaAutenticado}
                />
                <Route path="/" exact>
                  <ListagemVeiculos />
                </Route>
                <Route path="/login">
                  <Login handleChangeLogin={handleChangeLogin} />
                </Route>
                <Route path="/cadastro">
                  <Cadastro />
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

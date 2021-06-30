import React from 'react';
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

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
  },
  ptBR,
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
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <Header />
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component='article' maxWidth='md'>
            <Switch>
              <Route path='/cadastro-marca'>
                <CadastroMarca />
              </Route>
              <Route path='/alteracao-marca/:id'>
                <CadastroMarca />
              </Route>
              <Route path='/listar-marcas'>
                <ListagemMarcas />
              </Route>
              <Route path='/cadastro-veiculo' exact>
                <CadastroVeiculo />
              </Route>
              <Route path='/' exact>
                <ListagemVeiculos />
              </Route>
              <Route path='/login'>
                <Login />
              </Route>
              <Route path='/cadastro'>
                <Cadastro />
              </Route>
            </Switch>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

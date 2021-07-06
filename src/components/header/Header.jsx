import React, { useState } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { StyledHeader, MenuButton, Title } from './styles';
import { useContext } from 'react';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';

const Header = ({ handleChangeLogin }) => {
  const [linkPara, setLinkPara] = useState(null);
  const [menuLogout, setMenuLogout] = useState(null);

  const history = useHistory();

  const abrirMenu = (e) => setLinkPara(e.currentTarget);
  const fecharMenu = () => setLinkPara(null);
  const redirecionarPara = (pagina) => history.push(pagina);

  const usuarioAutenticado = useContext(UsuarioAutenticado);
  const abrirLogout = (e) => setMenuLogout(e.currentTarget);
  const fecharLogout = () => setMenuLogout(null);
  const logout = () => {
    handleChangeLogin({});
    redirecionarPara('/');
  };

  const renderLogin = () => {
    let component = (
      <Button onClick={() => history.push('/login')} color="inherit">
        Login
      </Button>
    );
    if (usuarioAutenticado.nome) {
      component = (
        <div>
          <Button
            aria-controls="logout-menu"
            aria-haspopup="true"
            onClick={abrirLogout}
            style={{ color: '#fff' }}
          >
            {usuarioAutenticado.nome}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={menuLogout}
            keepMounted
            open={Boolean(menuLogout)}
            onClose={fecharLogout}
          >
            <MenuItem
              onClick={() => {
                fecharLogout();
                logout();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </div>
      );
    }
    return component;
  };

  return (
    <StyledHeader>
      <AppBar position="static">
        <Toolbar>
          <MenuButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={abrirMenu}
          >
            <MenuIcon aria-controls="menu" aria-haspopup="true" />
          </MenuButton>
          <Menu
            id="menu"
            anchorEl={linkPara}
            keepMounted
            open={Boolean(linkPara)}
            onClose={fecharMenu}
          >
            <MenuItem
              onClick={() => {
                fecharMenu();
                redirecionarPara('/');
              }}
            >
              Veículos
            </MenuItem>
            <MenuItem
              onClick={() => {
                fecharMenu();
                redirecionarPara('/listar-marcas');
              }}
            >
              Marcas
            </MenuItem>
          </Menu>
          <Title component="h1" variant="h6" onClick={() => history.push('/')}>
            Carango Bom
          </Title>
          {renderLogin()}
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};

Header.propTypes = {
  handleChangeLogin: PropTypes.func,
};

export default Header;

import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';

import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { StyledHeader, MenuButton, Title, MenuIconButton } from './styles';
import UsuarioAutenticado from '../../contexts/UsuarioAutenticado';

const Header = ({ handleChangeLogin }) => {
  const [linkPara, setLinkPara] = useState(null);
  const [menuLogado, setMenuLogado] = useState(null);

  const history = useHistory();

  const usuarioAutenticado = useContext(UsuarioAutenticado);

  const abrirMenu = (e) => setLinkPara(e.currentTarget);
  const fecharMenu = () => setLinkPara(null);
  const redirecionarPara = (pagina) => history.push(pagina);

  const abrirMenuLogado = (e) => setMenuLogado(e.currentTarget);
  const fecharMenuLogado = () => setMenuLogado(null);
  const logout = () => {
    handleChangeLogin(null);
    redirecionarPara('/');
  };

  const estaAutenticado = () => {
    return usuarioAutenticado?.nome;
  };

  const adicionarItensMenu = (menuItems) =>
    menuItems.push(
      {
        titulo: 'Marcas',
        rota: '/listar-marcas',
      },
      { titulo: 'Usuários', rota: '/listar-usuarios' },
      {
        titulo: 'Dashboard',
        rota: '/dashboard',
      }
    );

  const renderMenuItems = () => {
    let menuItems = [{ titulo: 'Veículos', rota: '/' }];
    if (estaAutenticado()) adicionarItensMenu(menuItems);
    return menuItems;
  };

  const renderLogin = () => {
    let component = (
      <Button onClick={() => history.push('/login')} color='inherit'>
        Login
      </Button>
    );
    if (estaAutenticado()) {
      component = (
        <div>
          <MenuButton
            aria-controls='menu'
            aria-haspopup='true'
            aria-label='menu-logado'
            onClick={abrirMenuLogado}
          >
            {usuarioAutenticado.nome}
          </MenuButton>
          <Menu
            id='simple-menu'
            anchorEl={menuLogado}
            keepMounted
            open={Boolean(menuLogado)}
            onClose={fecharMenuLogado}
          >
            <MenuItem
              onClick={() => {
                fecharMenuLogado();
                redirecionarPara(`/alterar-senha/${usuarioAutenticado.id}`);
              }}
            >
              Alterar senha
            </MenuItem>
            <MenuItem
              onClick={() => {
                fecharMenuLogado();
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
      <AppBar position='static'>
        <Toolbar>
          <MenuIconButton
            edge='start'
            color='inherit'
            aria-label='pages-menu'
            onClick={abrirMenu}
          >
            <MenuIcon aria-controls='menu' aria-haspopup='true' />
          </MenuIconButton>
          <Menu
            id='menu'
            anchorEl={linkPara}
            keepMounted
            open={Boolean(linkPara)}
            onClose={fecharMenu}
          >
            {renderMenuItems().map((menuItem, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  fecharMenu();
                  redirecionarPara(menuItem.rota);
                }}
              >
                {menuItem.titulo}
              </MenuItem>
            ))}
          </Menu>
          <Title component='h1' variant='h6' onClick={() => history.push('/')}>
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

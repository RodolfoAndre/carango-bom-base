import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { AppBar, Toolbar, Button, Menu, MenuItem } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { StyledHeader, MenuButton, Title } from './styles';

const Header = () => {
  const [linkPara, setLinkPara] = useState(null);

  const history = useHistory();

  const abrirMenu = (e) => setLinkPara(e.currentTarget);

  const fecharMenu = () => setLinkPara(null);

  const redirecionarPara = (pagina) => {
    setLinkPara(null);
    history.push(pagina);
  };

  return (
    <StyledHeader>
      <AppBar position='static'>
        <Toolbar>
          <MenuButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon
              aria-controls='menu'
              aria-haspopup='true'
              onClick={abrirMenu}
            />

            <Menu
              id='menu'
              anchorEl={linkPara}
              keepMounted
              open={Boolean(linkPara)}
              onClose={fecharMenu}
            >
              <MenuItem onClick={() => redirecionarPara('/')}>
                Veículos
              </MenuItem>
              <MenuItem
                onClick={() => {
                  redirecionarPara('/listar-marcas');
                }}
              >
                Marcas
              </MenuItem>
            </Menu>
          </MenuButton>
          <Title component='h1' variant='h6' onClick={() => history.push('/')}>
            Carango Bom
          </Title>
          <Button onClick={() => history.push('/login')} color='inherit'>
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </StyledHeader>
  );
};

export default Header;

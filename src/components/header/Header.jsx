import React from 'react';
import { useHistory } from 'react-router';

import { AppBar, Toolbar, Button, Menu } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

import { StyledHeader, MenuButton, Title } from './styles';

const Header = () => {
  const history = useHistory();

  return (
    <StyledHeader>
      <AppBar position='static'>
        <Toolbar>
          <MenuButton edge='start' color='inherit' aria-label='menu'>
            <MenuIcon />
          </MenuButton>
          <Title variant='h6' onClick={() => history.push('/')}>
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

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component, estaAutorizado, ...rest }) => {
  const renderRotaPrivada = (component, props) => {
    return estaAutorizado() ? (
      component
    ) : (
      <Redirect to={{ pathname: '/', state: { from: props.location } }} />
    );
  };

  return (
    <Route {...rest} render={(props) => renderRotaPrivada(component, props)} />
  );
};

PrivateRoute.propTypes = {
  component: PropTypes.any,
  estaAutorizado: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;

import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

const PrivateRoute = ({ component, estaAutenticado, ...rest }) => {
  const renderRotaPrivada = (component, props) => {
    return estaAutenticado() ? (
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
  estaAutenticado: PropTypes.func,
  location: PropTypes.object,
};

export default PrivateRoute;

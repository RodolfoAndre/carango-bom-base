import React from 'react';
import PropTypes from 'prop-types';

import { Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

const Alert = (props) => <MuiAlert elevation={6} variant='filled' {...props} />;

const SnackbarAlert = ({ isOpen, message, severity, handleClose }) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

SnackbarAlert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default SnackbarAlert;

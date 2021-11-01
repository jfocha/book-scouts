import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from '../LoginForm';

const LoginModalDialog = ({ open, handleLoginClose }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleLoginClose}>
      <LoginForm handleLoginClose={handleLoginClose} />
    </Dialog>
  );
};

export default LoginModalDialog;
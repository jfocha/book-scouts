import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import LoginForm from '../LoginForm';

const LoginModalDialog = ({ open, handleLoginClose, setCurrentCategory, categories }) => {
  return (
    // props received from App.js
    <Dialog open={open} onClose={handleLoginClose}>
      <LoginForm handleLoginClose={handleLoginClose} setCurrentCategory={setCurrentCategory} categories={categories} />
    </Dialog>
  );
};

export default LoginModalDialog;
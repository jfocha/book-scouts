import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const LoginForm = ({ handleLoginClose }) => {
  const classes = useStyles();
  // create state variables for each input

  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const [login, { error }] = useMutation(LOGIN_USER);
  console.log(error);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // pass info to back end here
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });
      console.log(data);
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    handleLoginClose();
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
    
      <TextField
        label="Email"
        variant="filled"
        type="email"
        required
        value={ userFormData.email }
        onChange={e => setUserFormData({...userFormData, email: e.target.value})}
      />
      <TextField
        label="Password"
        variant="filled"
        type="password"
        required
        value={ userFormData.password }
        onChange={e => setUserFormData({...userFormData, password: e.target.value})}
      />
      <div>
        <Button variant="contained" onClick={handleLoginClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
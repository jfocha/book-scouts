import * as React from 'react';
import { useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import LoginModalDialog from '../LoginModalDialog';

export default function MenuAppBar(props) {
  const {
    categories = [],
    setCurrentCategory,
    currentCategory,
  } = props;

  useEffect(() => {
    document.title = currentCategory.name;
  }, [currentCategory]);

  const [auth, setAuth] = React.useState(false);
  console.log(auth);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // declare a new state variable for modal open
  const [open, setOpen] = React.useState(false);

  // function to handle modal open
  const handleLoginOpen = () => {
    setOpen(true);
  };

  // function to handle modal close
  const handleLoginClose = () => {
    setOpen(false);
  };

  const logout = event => {
    event.preventDefault();
    Auth.logout();
  };

  const handleClick = (location) => {
    setCurrentCategory(categories[location]);
    if (location === 0) {
      Auth.logout();
    }
    handleClose();
  }

  return (
    <Box sx={{ flexGrow: 1 }}>

      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >

          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Book Scouts
          </Typography>

          <FormGroup>

            <FormControlLabel
              control={
                <Switch
                  checked={Auth.loggedIn()}
                  onChange={handleChange}
                  aria-label="login switch"
                  onClick={Auth.loggedIn() ? logout : handleLoginOpen}
                />
              }
              label={Auth.loggedIn() ? 'Logout' : 'Login'}
            />

          </FormGroup>

          {Auth.loggedIn() && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {categories.map((category, i) => (
                  <span key={i}>
                    <MenuItem onClick={() => {handleClick(i)}}>
                      <Link to={categories[i].description}>{categories[i].name}</Link>
                    </MenuItem>
                  </span>
                ))}
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <LoginModalDialog open={open} handleLoginClose={handleLoginClose} />
    </Box>

  );
}

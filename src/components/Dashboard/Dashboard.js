import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import CompressIcon from '@mui/icons-material/Compress';
import GoogleIcon from '@mui/icons-material/Google';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

import { AppBar, DrawerHeader } from './DashboardStyledComponents';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';
import { Button } from '@mui/material';

export default function Dashboard() {

  const drawerWidth = 240;
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState();
  const [userProfile, setUserProfile] = React.useState(false);

  // Handle open drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: () => setUser(false)
  })
  const logout = () => {
    googleLogout();
    setUserProfile(false);
  }

  React.useEffect(() => {
    if (user) {
      axios
        .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: 'application/json'
          }
        }).then((res) => setUserProfile(res.data))
    }
  }, [user])


  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* HEADER PORTION */}
      <AppBar position="fixed" open={open}>
        <Toolbar className='glass'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Link to='/'>
            <Typography variant="h6" noWrap component="div">
              Remote Interface
            </Typography>
          </Link>
          <Box sx={{ marginLeft: 'auto' }}>
            {!userProfile ? (<GoogleLogin onSuccess={login} />) :

              (<Box
                className='flex gap-3 p-1 rounded-md'
                style={{ background: '#FFFFFF', textTransform: 'none', color: '#000000', fontSize: '12px' }}>

                <Box sx={{ margin: '0px' }}>
                  <img style={{ width: '30px', borderRadius: '20px' }} src={userProfile.picture} />
                </Box>
                Logged in as <br /> {userProfile.name}

                <Divider orientation='vertical' flexItem color='#dcdfe3' />

                <Button
                  onClick={logout}
                  style={{ background: '#FFFFFF', textTransform: 'none', color: '#000000', fontSize: '12px' }}>
                  Logout
                  <GoogleIcon />
                </Button>

              </Box>

              )}

          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <List>

          <Navigation dependencyObj={{
            type: 'Temperature', closeMethod: handleDrawerClose,
            icon: <ThermostatIcon />, toUrl: 'temperature'
          }}
          />
          <Navigation dependencyObj={{
            type: 'Air Quality', closeMethod: handleDrawerClose,
            icon: <ThermostatIcon />, toUrl: 'temperature'
          }}
          />
          <Navigation dependencyObj={{
            type: 'Air parameters', closeMethod: handleDrawerClose,
            icon: <CompressIcon />, toUrl: 'pressure'
          }}
          />

        </List>
      </Drawer>

    </Box>
  );
}

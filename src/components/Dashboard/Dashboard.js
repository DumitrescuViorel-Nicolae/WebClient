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


import { AppBar, DrawerHeader } from './DashboardStyledComponents';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import Navigation from './Navigation';

export default function Dashboard() {

  const drawerWidth = 240;


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  // Handle open drawer
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

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

          <Navigation dependencyObj = {{type:'Temperature', closeMethod: handleDrawerClose, 
            icon: <ThermostatIcon/>, toUrl: 'temperature'}}
          />
          <Navigation dependencyObj = {{type:'Pressure', closeMethod: handleDrawerClose, 
            icon: <CompressIcon/>, toUrl: 'pressure'}}
          />
          <Navigation dependencyObj = {{type:'Temperature', closeMethod: handleDrawerClose, 
            icon: <ThermostatIcon/>, toUrl: 'temperature'}}
          />

        </List>
      </Drawer>

    </Box>
  );
}

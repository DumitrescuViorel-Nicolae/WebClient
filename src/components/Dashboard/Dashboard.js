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

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import { AppBar, DrawerHeader, Main } from './DashboardStyledComponents';
import './Dashboard.css'
import { Link } from 'react-router-dom';
import DashboardMain from './DashboardMain';

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

          <Link to={'temperature'}>
            <ListItem key={'Temperature'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={'Temperature'} />
              </ListItemButton>
            </ListItem>
          </Link>

            <Link to={'pressure'}>
              <ListItem key={'Pressure'} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MenuIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Pressure'} />
                </ListItemButton>
              </ListItem>
            </Link>

        </List>
      </Drawer>

    </Box>
  );
}

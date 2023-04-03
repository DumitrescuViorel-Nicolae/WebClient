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
import { Link } from 'react-router-dom';

export default function Dashboard({ renderPage }) {

  const drawerWidth = 240;
  const currentPath = window.location.pathname.substring(1);
  const capitalize = currentPath.charAt(0).toUpperCase();
  const capitalizedPath = capitalize + currentPath.slice(1)
  const renderedPage = renderPage.type.name.toString();
  const linkTo = capitalizedPath === renderedPage ? true : false;

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
        <Toolbar>
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

          <Link to={linkTo ? false : 'pressure'}>
            <ListItem key={'Pressure'} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText primary={'Pressure'} />
              </ListItemButton>
            </ListItem>
          </Link>
          
          <Link to={linkTo ? false : 'pressure'}>
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

      <Main open={open}>

        <DrawerHeader />
        {renderPage}
      </Main>
    </Box>
  );
}

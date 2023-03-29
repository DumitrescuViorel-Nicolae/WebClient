import './App.css';
import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import {Routes, Route} from 'react-router-dom'
import Temperature from './components/Temperature';
import Pressure from './components/Pressure';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';


const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
      <Routes>
        <Route path = '/' element={<Dashboard/>}/>
        <Route path='temperature' element={<Temperature/>}/>
        <Route path='pressure' element={<Pressure/>}/>
      </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

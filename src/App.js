import './App.css';
import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'
import Temperature from './components/Temperature';
import Pressure from './components/Pressure';

import { ThemeProvider, createTheme } from '@mui/material/styles';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='temperature' element={<Temperature />} />
          <Route path='pressure' element={<Pressure />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

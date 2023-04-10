import './App.css';
import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'
import Pressure from './components/IndividualPages/Pressure';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Temperature from './components/IndividualPages/Temperature';
import DashboardMain from './components/Dashboard/DashboardMain';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <Dashboard/>
        <Routes>
          <Route path='/' element={<DashboardMain/>} />
          <Route path='temperature' element={<Temperature/>}/>
          <Route path='pressure' element={<Pressure/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

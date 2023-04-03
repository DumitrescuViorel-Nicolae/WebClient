import './App.css';
import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'
import Pressure from './components/IndividualPages/Pressure';

import { ThemeProvider, createTheme } from '@mui/material/styles';
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
        <Routes>
          <Route path='/' element={<Dashboard renderPage={<DashboardMain/>}/>} />
          <Route path='pressure' element={<Dashboard renderPage={<Pressure/>}/>}/>
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Temperature from './components/IndividualPages/Temperature';
import DashboardMain from './components/Dashboard/DashboardMain';
import AirQuality from './components/IndividualPages/AirQuality';
import AirParameters from './components/IndividualPages/AirParameters';

function App() {

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
          <Dashboard />
          <Routes>
            <Route path='/' element={<DashboardMain />} />
            <Route path='temperature' element={<Temperature />} />
            <Route path='airQuality' element={<AirQuality/>}/>
            <Route path='pressure' element={<AirParameters/>} />
          </Routes>

      </div>
    </ThemeProvider>
  );
}

export default App;

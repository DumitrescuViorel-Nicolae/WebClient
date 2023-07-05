import * as React from 'react';

import Dashboard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom'

import { ThemeProvider, createTheme } from '@mui/material/styles';
import Temperature from './components/IndividualPages/Temperature';
import DashboardMain from './components/Dashboard/DashboardMain';
import AirQuality from './components/IndividualPages/AirQuality';
import AirParameters from './components/IndividualPages/AirParameters';
import Reports from './components/IndividualPages/Reports';

function App() {

  const [mode, setMode] = React.useState('dark')

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  const onClick = (switchMode) => {
    if(switchMode === 'light'){
      setMode('dark')
    }else{
      setMode('light')
    }
  } 


  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
          <Dashboard mode = {mode} func ={onClick} />
          <Routes>
            <Route exact path='/' element={<DashboardMain />} />
            <Route exact path='temperature' element={<Temperature />} />
            <Route exact path='airQuality' element={<AirQuality/>}/>
            <Route exact path='parameters' element={<AirParameters/>} />
            <Route exact path='reports' element={<Reports/>} />
          </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;

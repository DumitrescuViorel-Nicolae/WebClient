import React, { useEffect, useState } from 'react'

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Card, LinearProgress } from '@mui/material';

import './Dashboard.css'

import temperature from '../../media/temperature.jpg'
import pressure from '../../media/pressure.jpg'
import humidity from '../../media/humidity.jpg'
import gas from '../../media/gas.jpg'
import altitude from '../../media/altitude.jpg'
import iaq from '../../media/iaq.jpg'
import dashboard from '../../media/dashboard.jpg'


import axiosClient from '../../shared/axiosClient';
import { READINGS } from '../../shared/endpoints'
import DashboardCards from './DashboardCards';
import { Box } from '@mui/system';

function DashboardMain() {

  const [readings, setReadings] = useState(null);
  const [loading, setLoading] = useState(false);


  function getReadings() {
    axiosClient.get(READINGS).then(res => {
      setReadings(res.data); setLoading(false);
    });
  }


  const first3Readings = readings?.slice(0, 3);
  const restOfReadings = readings?.slice(3, readings.length);


  const getImage = (type) => {
    switch (type) {
      case 'temperature':
        return temperature
      case 'pressure':
        return pressure
      case 'humidity':
        return humidity;
      case 'gas':
        return gas;
      case 'altitude':
        return altitude;
      case 'iaq':
        return iaq;
      default:
        break;
    }
  }

  useEffect(() => {
    getReadings();
    // eslint-disable-next-line
  }, [])

  return (

    <div className='my-20'>
      <Card className='mx-20 my-10' sx={{ borderRadius: '20px' }}>
        <CardActionArea>
          <CardMedia style={{ width: '100%', position: 'relative' }} sx={{ height: 450 }} image={dashboard} />
          <CardContent style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <Typography style={{fontFamily:"Google Sans", color: "#e4e6eb", letterSpacing:'0.3rem'}} variant="h2" fontWeight="bold">
              Monitoring Dashboard
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {readings !== null ? (

        <Grid className='my-20' container spacing={5} direction="row" alignItems="center" justifyContent="center">

          <Grid item xs={12}>
            <Typography style={{fontFamily:"Google Sans", color: "#e4e6eb", letterSpacing:'0.1rem'}}
              marginLeft='20rem' marginBottom='0' textAlign={'left'} variant='h4' gutterBottom>
              Air parameters
            </Typography>
          </Grid>

        
          {first3Readings?.map((reading) =>
            <DashboardCards key={reading.type} props={{ reading }}
              dependencyObj={{ getImage: getImage, getReadings: getReadings, setLoading: setLoading, loading: loading }}
            />
          )}

          <Grid item xs={12}>
          <Typography marginTop='5rem' style={{fontFamily:"Google Sans", color: "#e4e6eb", letterSpacing:'0.1rem'}}
              marginLeft='20rem' marginBottom='0' textAlign={'left'} variant='h4' gutterBottom>
              Air quality
            </Typography>
          </Grid>

          {restOfReadings?.map((reading) =>
            <DashboardCards key={reading.type} props={{ reading }}
              dependencyObj={{ getImage: getImage, getReadings: getReadings, setLoading: setLoading, loading: loading }}
            />
          )}


        </Grid>) : (
        <Box height={'50vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Card>
                        <div className='w-80 m-4'>Loading...</div>
                        <CardContent >
                            <LinearProgress />
                        </CardContent>
                    </Card>
                </Box>
        )}
    </div>

  )
}

export default DashboardMain

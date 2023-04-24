import React, { useEffect, useState } from 'react'

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, CardActions, Grid, Card, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import './Dashboard.css'

import temperature from '../../media/temperature.jpg'
import pressure from '../../media/pressure.jpg'
import humidity from '../../media/humidity.jpg'
import gas from '../../media/gas.jpg'
import altitude from '../../media/altitude.jpg'
import axiosClient from '../../shared/axiosClient';
import { READINGS } from '../../shared/endpoints'

function DashboardMain() {

  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);



  function getReadings() {
    axiosClient.get(READINGS).then(res => {
      setReadings(res.data); setLoading(false);
    });
  }

  useEffect(() => {

    const readingsExisting = JSON.parse(localStorage.getItem("readings") || "[]");

    if (readingsExisting.length === 0) {
      localStorage.setItem("readings", JSON.stringify(readings))
    } else {
      readingsExisting.push(...readings);
      localStorage.setItem("readings", JSON.stringify(readingsExisting))
    }
  }, [loading])


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
      {readings.length > 0 ? <Grid className='my-20' container spacing={2} direction="row" alignItems="center" justifyContent="center">

        {readings?.map(reading => (
          <Grid item key={reading.type} xs='auto'>
            <Card sx={{ borderRadius: '16px' }}>
              <CardActionArea>
                <CardMedia
                  sx={{ width: 400, height: 400 }}
                  component="img"
                  height="140"
                  image={getImage(reading.type)}
                  alt={reading.type}
                />
                <CardContent>
                  <Typography className='capitalize' gutterBottom variant="h5" component="div">
                    {reading.type}
                  </Typography>

                  <Typography variant="h5" color="text.secondary" fontWeight={600}>
                    {reading.value} {reading.unit}
                  </Typography>
                </CardContent>

              </CardActionArea>
              <CardActions>
                <LoadingButton onClick={() => { getReadings(); setLoading(true); }} loading={loading}>Refresh</LoadingButton>
              </CardActions>
            </Card>
          </Grid>
        ))}

      </Grid> : (<Card className='py-52 my-52 px-52' id='glass'>
        <LinearProgress />
      </Card>)}
    </div>

  )
}

export default DashboardMain

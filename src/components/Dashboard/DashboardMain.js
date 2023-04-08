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
import {READINGS} from '../../shared/endpoints'

function DashboardMain() {

  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(false);



  function getReadings() {
    axiosClient.get(READINGS).then(res => { setReadings(res.data); setLoading(false) });
  }

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
    <>
      {readings.length > 0 ? <Grid container spacing={2} direction="row" alignItems="center" justifyContent="center">

        {readings?.map(reading => (
          <Grid item key={reading.type} xs='auto'>
            <Card>
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

      </Grid> : ( <Card className='py-52 my-52 px-52' id='glass'>
          <LinearProgress />
        </Card>)}
    </>

  )
}

export default DashboardMain
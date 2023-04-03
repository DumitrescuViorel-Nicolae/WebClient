import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import temperature from '../media/temperature.jpg'
import pressure from '../media/pressure.jpg'
import humidity from '../media/humidity.jpg'
import gas from '../media/gas.jpg'
import altitude from '../media/altitude.jpg'

function Temperature() {
  const axiosClient = axios.create({
    baseURL: 'https://localhost:44328/api/Sensors',
  })

  const [readings, setReadings] = useState();

  function getReadings() {
    axiosClient.get('/GetEnvironmentReadings').then(res => setReadings(res.data))
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
      <Grid container spacing={2} columns={4} direction="row" alignItems="center" justifyContent="center">

        {readings?.map(reading => (
          <Grid item key={reading.type} xs='auto'>
            <Card sx={{ maxWidth: 345 }}>
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
                <Button size="small" color="primary">
                  Refresh
                </Button>
              </CardActions>

            </Card>
          </Grid>
        ))}
      </Grid>


    </>

  )
}

export default Temperature

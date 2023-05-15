import React from 'react'
import { CardActionArea, CardActions, Grid, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { LoadingButton } from '@mui/lab';
import { Link } from 'react-router-dom';

const DashboardCards = ({dependencyObj, props}) => {
  
const {reading} = props;
  return (
    <Grid item style={{paddingTop:'10px'}} key={reading.type} xs='auto'>
    <Card sx={{ borderRadius: '16px'}}>
      <CardActionArea>
        <Link to={reading.type}>
          <CardMedia
            sx={{ width: 350, height: 350, borderRadius: "16px" }}
            component="img"
            height="140"
            image={dependencyObj.getImage(reading.type)}
            alt={reading.type}
          />
        </Link>

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
        <LoadingButton onClick={() => { dependencyObj.getReadings(); dependencyObj.setLoading(true); }} loading={dependencyObj.loading}>Refresh</LoadingButton>
      </CardActions>
    </Card>
  </Grid>
  )
}

export default DashboardCards
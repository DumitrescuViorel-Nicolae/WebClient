import React, { useEffect, useState } from 'react'
import { DrawerHeader } from '../Dashboard/DashboardStyledComponents'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getReadings } from '../../shared/sharedFunctions';
import Buttons from '../../shared/SharedComponents/Buttons';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, Input } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import WeatherComponent from './WeatherComponent';
import { CONTROL_SERVO } from '../../shared/endpoints';
import axiosClient from '../../shared/axiosClient';

function Temperature() {


  const [tableData, setTableData] = useState([]);
  const [position, setPosition] = useState();

  useEffect(() => {
    getReadings(setTableData);
  }, [])

  const temperature = tableData?.filter(item => item.type === 'temperature');
  const acitonateButton = async () => {
    await axiosClient.post(`${CONTROL_SERVO}?position=${position}`);
  }

  return (
    <>
      <DrawerHeader />
      <Grid container>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <div className='flex flex-col justify-center items-center '>
            <div className='my-5'>Temperature[°C]</div>
            <LineChart
              width={900}
              height={700}
              data={temperature}
              margin={{
                top: 10,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis label={{ value: 'Time [hh:mm:ss]', dy: 20,dx: 60, position: 'left' }} dataKey='time' />
              <YAxis label={{ value: 'Value', dx: 15, angle: -90, position: 'left', dataKey: 'value' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey='value' stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </div>
        </Grid>

        <Grid container xs={12} sm={10} md={10} lg={6}
          justifyContent='center' alignItems='center'>

          <Grid item xs={12} sm={10} md={10} lg={8}>
            <Box>
              <WeatherComponent />
            </Box>
          </Grid>

          <Grid style={{ width: '60%' }} item xs={12} sm={12} md={12} lg={10}>
            <Buttons setFunction={setTableData} />
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={10}>
            <Grid container justifyContent='center' marginBottom='3rem'>
              <FormControl>
                <FormControlLabel control={<Checkbox />} label="Automatic trigger" />
                <Input placeholder='Enter degrees' className='my-1'
                  onChange={(e) => setPosition(e.target.value)} />
                <Button variant='outlined' onClick={acitonateButton}>Trigger Servo</Button>
              </FormControl>
            </Grid>
          </Grid>

        </Grid>

      </Grid>

    </>
  )
}

export default Temperature
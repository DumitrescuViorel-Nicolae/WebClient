import { Box } from '@mui/system'
import { Button, Tooltip, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { getReadings } from '../../shared/sharedFunctions';

const Reports = () => {

  const [data, setData] = useState([]);
  useEffect(() => {
    getReadings(setData);
    //eslint-disable-next-line
  }, [])


  return (
    <Box display={'flex'} justifyContent={'center'}
      height={'100vh'}
      alignItems={'center'}
      gap={2}
      flexDirection={'column'}>
      <div>Generated report placeholder</div>
      <div>The report shall contain the details(which parameter increased), <br /> the action taken and a graph will be displayed dynamically to see the increase</div>
      <Tooltip title={<Typography textAlign={'center'}>
        Simulates a dangerous increase <br />
        Initiates the procedure
        Generates Report and sends alerts
      </Typography>}>
        <Button variant='outlined'>Simulate</Button>
      </Tooltip>

    </Box>



  )
}

export default Reports




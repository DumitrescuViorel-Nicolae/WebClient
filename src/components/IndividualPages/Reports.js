import { Box } from '@mui/system'
import { Button, Tooltip, Typography } from '@mui/material'

import React, { useEffect, useState } from 'react'
import { getReadings } from '../../shared/sharedFunctions';
import axiosClient from '../../shared/axiosClient';
import { CHECKER_SIMULATE } from '../../shared/endpoints';

const Reports = () => {

  const [data, setData] = useState([]);
  const [reportText, setReportText] = useState('');
  const [reportNr, setReportNr] = useState(0);
  useEffect(() => {
    getReadings(setData);
    //eslint-disable-next-line
  }, [])

  const handleSimulate = async () => {
    await axiosClient.post(CHECKER_SIMULATE).then((report) => report.data !== '' ? setReportText(report.data) : null);
    setReportNr(reportNr => reportNr + 1)
  }


  return (
    <Box display={'flex'} justifyContent={'center'}
      height={'100vh'}
      alignItems={'center'}
      gap={2}
      flexDirection={'column'}>
      <div>Report {reportNr}</div>
      <div>{reportText}</div>
      <Tooltip title={<Typography textAlign={'center'}>
        Simulates a dangerous increase <br />
        Initiates servo procedure and makes a report
      </Typography>}>
        <Button onClick={handleSimulate} variant='outlined'>Simulate</Button>
      </Tooltip>

    </Box>



  )
}

export default Reports




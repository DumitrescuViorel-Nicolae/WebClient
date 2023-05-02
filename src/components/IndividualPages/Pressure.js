import React, { useEffect, useState } from 'react'
import { DrawerHeader } from '../Dashboard/DashboardStyledComponents'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { DBREADINGS } from '../../shared/endpoints';
import axiosClient from '../../shared/axiosClient';
import Buttons from '../../shared/SharedComponents/Buttons';


function Pressure() {

   const [tableData, setTableData] = useState([]);

  function getReadings() {
    axiosClient.get(DBREADINGS).then(res => {
      setTableData(res.data);
    });
  }

  useEffect(() => {
    getReadings();
  }, [])

  const pressure = tableData.filter(item => item.type === 'pressure');
  return (
    <div>
      <DrawerHeader />
      <div className='my-10'>Pressure</div>

      <div className='flex justify-center'>
          <LineChart
            width={1000}
            height={700}
            data={pressure}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis label={{value: 'Time', dy: 20, position: 'left' }} dataKey='time' />
            <YAxis label={{ value: 'Value', angle: -90, position: 'left', dataKey: 'value' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey='value' stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
      </div>

      <Buttons setFunction={setTableData}/>
    </div>
  )
}

export default Pressure
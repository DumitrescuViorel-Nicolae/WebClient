import React, { useEffect, useState } from 'react'
import { getReadings } from '../../shared/sharedFunctions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Grid, Typography } from '@mui/material';
import Buttons from '../../shared/SharedComponents/Buttons';

const AirParameters = () => {

    const [data, setData] = useState([]);

    
    useEffect(() => {
        getReadings(setData);
        //eslint-disable-next-line
    }, [])

    const groupedData = data.reduce((acc, entry) => {
        const { type } = entry;
        const group = acc.find((group) => group.type === type);
        if (group) {
            group.values.push({value: entry.value, time: entry.time});
        } else {
            acc.push({ type, values: [{value: entry.value, time: entry.time}] });
        }
        return acc;
    }, []);
  
    return (
        <Grid container className='my-28'>
            {groupedData.map(item =>
                <Grid item md={6} lg={4}>
                    <Typography align='center'>
                        {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Typography>
                    <LineChart
                        style={{margin: '0 auto'}}
                        key={item.type}
                        width={450}
                        height={450}
                        data={item.values}
                        margin={{
                            top: 20,
                            right: 10,
                            left: 10,
                            bottom: 30,
                        }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis label={{ value: 'Time', dy: 20, position: 'left' }}
                         dataKey='time' />
                        <YAxis label={{ value: 'Values', dx: 15, angle: -90, position: 'left', dataKey: 'value' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey='value' stroke="#8884d8" activeDot={{ r: 8 }} />
                    </LineChart>
                </Grid>   
            )}
            <Grid item>
            <Buttons setFunction = {setData}/>
            </Grid>
        </Grid>

    )
}

export default AirParameters
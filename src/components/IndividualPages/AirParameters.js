import React, { useEffect, useState } from 'react'
import { getReadings } from '../../shared/sharedFunctions';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card, CardContent, Grid, LinearProgress, Typography } from '@mui/material';
import Buttons from '../../shared/SharedComponents/Buttons';
import { Box } from '@mui/system';

const AirParameters = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getReadings(setData);
        //eslint-disable-next-line
    }, [])

    const groupedData = data.reduce((acc, entry) => {
        const { type } = entry;
        const { unit } = entry;
        const group = acc.find((group) => group.type === type);
        if (group) {
            group.values.push({ value: entry.value, time: entry.time });
        } else {
            acc.push({ type, unit, values: [{ value: entry.value, time: entry.time }] });
        }
        return acc;
    }, []);

    const domainValueCalculate = (value) => {

        let domain;
        const upperLimit = parseInt(value) + 20;

        if (value > 90) {
            domain = [0, upperLimit]
        }
        return domain
    }

    const checkForData = () => {
        if (data.length === 0) {
            return (
                <Box height={'100vh'} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                    <Card>
                        <div className='w-80 m-4'>Loading...</div>
                        <CardContent >
                            <LinearProgress />
                        </CardContent>
                    </Card>
                </Box>
            )
        } else {
            return (
                <Grid container className='my-28'>
                    {groupedData.map(item =>
                        <Grid key={item.type} item md={6} lg={4}>
                            <Typography align='center'>
                                {item.type.charAt(0).toUpperCase() + item.type.slice(1) + ` [${item.unit}]`}
                            </Typography>
                            <LineChart
                                style={{ margin: '0 auto' }}
                                key={item.type}
                                width={450}
                                height={450}
                                data={item.values}
                                margin={{
                                    top: 20,
                                    right: 10,
                                    left: 10,
                                    bottom: 30
                                }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis label={{ value: 'Time [hh:mm:ss]', dy: 30, dx: 60, position: 'left' }}
                                    dataKey='time'  tickMargin={10} />
                                <YAxis label={{ value: 'Values', dx: 25, dy: 20, angle: -90, position: 'left', dataKey: 'value' }}
                                    domain={domainValueCalculate(Math.max(...item.values.map(item => item.value)))}
                                />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey='value' stroke="#8884d8" activeDot={{ r: 5 }} />
                            </LineChart>
                        </Grid>
                    )}
                    <Grid item>
                        <Buttons setFunction={setData} />
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        checkForData()
    )
}

export default AirParameters
import { Card, CardContent, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getReadings } from '../../shared/sharedFunctions';
import { AIR_QUALITY_TABLE } from '../../shared/endpoints';
import axiosClient from '../../shared/axiosClient';
import AirQualityComponent from './AirQualityComponent';
import { Box } from '@mui/system';

const AirQuality = () => {

    const cardStyle = {
        borderRadius: '50%',
        width: 350,
        height: 350,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '3d3b3b5d', // Update with your desired background color
        color: '#ffffff', // Update with your desired text color
    };

    const contentStyle = {
        textAlign: 'center',
    };

    const [data, setData] = useState([]);
    const [indexTableData, setIndexTableData] = useState([])

    useEffect(() => {
        getReadings(setData);
        const airQualityIndexTable = async () => {
            const table = await axiosClient.get(`${AIR_QUALITY_TABLE}`);
            setIndexTableData(table.data)
        }
        airQualityIndexTable();

    }, [])

    const iaq = data.filter(item => item.type === 'iaq');
    function isValueInRange(range) {
        const value = iaq[iaq.length-1]?.value;
        const [lowerBound, upperBound] = range.split('-').map(Number);
        return value >= lowerBound && value <= upperBound;
    }

    function colorRange(range) {
        switch (range) {
            case '0-50':
                return 'green'

            case '51-100':
                return '#FF8300'

            case '101-150':
                return '#FF4500'

            case '151-200':
                return '#FF4433'

            case '201-300':
                return '#7C0A02'

            case '301-500':
                return 'red'

            default:
                break;
        }
    }

    return (
        <>
            <div className='flex justify-around my-40' >
                <Card style={cardStyle}>
                    <CardContent style={contentStyle}>
                        <Typography fontSize={'5rem'} fontWeight={'100'} variant="h5" component="div">
                            {iaq[iaq.length - 1]?.value}
                        </Typography>
                        <Typography variant="h5" color="text.secondary" component="div">
                            Points
                        </Typography>
                    </CardContent>
                </Card>

                <TableContainer component={Paper} style={{ maxWidth: '50rem' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Quality</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>Range <br /> [points]</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>VOC <br />[ppm]</TableCell>
                                <TableCell style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>CO2  <br />[ppm]</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {indexTableData?.map((row, index) => (
                                <TableRow key={index}>
                                    {Object.values(row).map((value, index) => (
                                        <TableCell style={{ color: isValueInRange(row.range) ? colorRange(row.range) : 'inherit' }} key={index}>{value}</TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Box display="flex" justifyContent="center" alignItems="center">
                <AirQualityComponent />
            </Box>
        </>





    )
}

export default AirQuality
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AIR_QUALITY_API } from '../../shared/endpoints';
import { Card, CardContent, Typography } from '@mui/material';

const AirQualityComponent = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${AIR_QUALITY_API}?token=35493d9d98f647e846ecf9eac485a7bd167050f9`);
        setData(Object.values(response.data)[1].forecast.daily.pm25);
      } catch (error) {
        console.error('Error fetching data', error);
      }
    };

    fetchData();
  }, []);

  if (!data) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="flex justify-center items-center flex-col">
      <Typography variant="h5" component="div" marginTop='1rem'>
        Bucharest IAQ Predictions
      </Typography>
      <div className="flex justify-center items-center">
        {data?.map((item, index) => (
          <Card key={index} className="m-2">
            <CardContent>
              <Typography textAlign="center" variant="h6">
                {item.day}
              </Typography>
              <Typography textAlign="center" variant="h6">
                {item.avg} points
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default AirQualityComponent;

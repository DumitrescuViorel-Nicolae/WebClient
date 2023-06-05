import { Card, CardContent, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GEOLOCATION_API, WEATHER_URL } from '../../shared/endpoints';

const WeatherComponent = () => {


    const [temperature, setTemperature] = useState(null);
    const [geolocationObject, setGeolocationObject] = useState({
        city: 'Bucharest',
        latitude: 44.43655014038086,
        longitude: 26.099349975585938
    })

    useEffect(() => {

        const response = async () => {
            try {

                const response = await axios.get(`${GEOLOCATION_API}?access_key=e6964f25333cf59e11d6ed6534cfbff6//`);
                const { latitude, longitude, city } = response.data;
                if (response.success) {
                    setGeolocationObject({ latitude: latitude, longitude: longitude, city: city });
                }
            } catch (error) {
                console.log('Error fetching location', error)
            }

        };

        response();

        const fetchWeatherData = async () => {
            try {
                const response = await axios.get(`${WEATHER_URL}?key=2211fc4ac9094f58ac4125524232905&q=${geolocationObject.latitude},${geolocationObject.longitude}`);
                const { temp_c } = response.data.current;
                setTemperature(temp_c);
            } catch (error) {
                console.log('Error fetching weather data:', error);
            }
        };

        fetchWeatherData();
        //eslint-disable-next-line
    }, [])


    // to add a component to return icons for weather
    // to add a component of predictions

    return (
        <Card className='flex justify-center'>
            <CardContent>
                <Typography variant='h4' textAlign='center'>
                    {temperature}°C
                </Typography>
                <Typography variant="h6" color="text.secondary" component="div">
                    Reference temperature in {geolocationObject.city}
                </Typography>
            </CardContent>
        </Card>
    )
}

export default WeatherComponent
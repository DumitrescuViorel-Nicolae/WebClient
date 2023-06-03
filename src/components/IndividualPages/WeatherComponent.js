import { Card, CardContent, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { WEATHER_URL } from '../../shared/endpoints';

const WeatherComponent = () => {


    const [temperature, setTemperature] = useState(null);
    const [geolocationObject, setGeolocationObject] = useState({
        latitude:  null,
        longitude: null
    })
      
    //   function successCallback(position) {
    //     // setGeolocationObject({
    //     //     latitude: position.coords.latitude,
    //     //     longitude: position.coords.longitude
    //     // })
    //   }
      
    //   function errorCallback(error) {
    //     console.log('Error retrieving geolocation:', error.message);
    //   }     
      

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
      } else {
        console.log('Geolocation is not supported by this browser.');
      }
      
      function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
      
        // Use the latitude and longitude values as needed
        console.log(navigator.geolocation.getCurrentPosition(successCallback))
      }
      
      function errorCallback(error) {
        console.log('Error retrieving geolocation:', error.message);
      }
      

    // useMemo(() => {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    //         console.log(navigator)
    //       } else {
    //         console.log('Geolocation is not supported by this browser.');
    //       }
    // },[geolocationObject])

    useEffect(() => {

       

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
    }, [])


    return (
        <Card className='flex justify-center'>
            <CardContent>
                <p>Current temperature in Bucharest</p>
                <Typography textAlign='center'>
                    {temperature}°C
                </Typography>
            </CardContent>
        </Card>
    )
}

export default WeatherComponent
import React, { useState, useEffect } from 'react';
import './Weather.css';

const api = {
    key: "a9eedcabedbfc78181768faae4ce7220",
    base: "https://api.openweathermap.org/data/2.5/"
};

const Weather = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    useEffect(() => {
        fetch(`${api.base}weather?q=Delhi&units=metric&APPID=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setWeather(result);
                console.log('Default city weather:', result);
            })
            .catch(error => {
                console.error('Error fetching default city weather:', error);
            });
    }, []);

    const search = evt => {
        if (evt.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
                .then(res => res.json())
                .then(result => {
                    setWeather(result);
                    setQuery('');
                    console.log(result);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        }
    };

    const formatDate = (d) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November"];
        
        const day = days[d.getDay()];
        const date = d.getDate();
        const month = months[d.getMonth()];
        const year = d.getFullYear();
        
        return `${day} ${date} ${month} ${year}`;
    };

    return (
        <div className="weather-container">
            <main>
                <div className='search-box'>
                    <input 
                        type='text'
                        className='search-bar'
                        placeholder='Search...'
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        onKeyPress={search}
                    />
                </div>
                {weather.main && (
                    <div className='weather-box'>
                        <div className='location-box'>
                            <div className='location'>{weather.name}, {weather.sys.country}</div>
                            <div className='date'>{formatDate(new Date())}</div>
                        </div>
                        <div className='weather-details'>
                            <div className='temp'>{Math.round(weather.main.temp)}°C</div>
                            <div className='weather'>{weather.weather[0].main}</div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Weather;

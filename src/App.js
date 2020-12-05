import React,{useState} from 'react';

import axios from "axios";
import './App.css'


const fetchData = async (query) => {

    const { data } = await axios.get('http://api.openweathermap.org/data/2.5/weather?q='+query+'&appid=f08f7aefa9c09ddd3d4e7680cba28e05',
    {
        params:{
            units: 'metric'
        }
    });
    return data;

}

const App = () => {
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = async (v) => {
        if(v.key === 'Enter') {
            try {
                const data = await fetchData(query);
                setWeather(data);
                setQuery('');
            }catch (e) {
                setWeather('');
                if(e.response.status===400)
                {
                    console.log("Please Enter value in search box");
                }
                else if(e.response.status===404)
                {
                    console.log("Enter valid data")
                }
                console.log(e);
            }
        }
    }

    return (
        <div id="div">
            <input type="text" className="search" placeholder="Search..."value={query}onChange={(v) => setQuery(v.target.value)}onKeyPress={search}/>
            {weather.main && (
                <div>
                    <h2>
                        Name: {weather.name}
                    </h2>
                    <h2>
                        Country: {weather.sys.country}
                    </h2>
                    <h2>
                        Temperature: {weather.main.temp}
                        <sup>&deg;C</sup>
                    </h2>
                    <h4>High: {weather.main.temp_max}   Low: {weather.main.temp_min}</h4>
                    <img className="img" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt=""/>
                    <h4>
                        <p>Description: {weather.weather[0].main}</p>
                    </h4>
                </div>
            )}
        </div>
    );
}

export default App;

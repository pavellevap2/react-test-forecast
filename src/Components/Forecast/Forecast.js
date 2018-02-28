import React from "react";
const URL_ICON = "https://www.metaweather.com/static/img/weather";

let Forecast = (props) => {
    let {weather} = props;

    return(
        <div className="Forecast">
            <h1 className="Forecast-title">{props.title}</h1>
            {weather.map((_, i) =>
                <div className="Forecast-days">
                    <ul className="Forecast-day" key={i}>
                        <li className="Forecast-day_weather">
                            {i == 0 ? "Today" : i == 1 ? "Tomorrow" : weather[i].applicable_date}
                        </li>
                        <li className="Forecast-day_weather">
                            <img src={`${URL_ICON}/png/64/${weather[i].weather_state_abbr}.png`}
                                 alt="icon"/>
                        </li>
                        <li className="Forecast-day_weather">{weather[i].weather_state_name}</li>
                        <li className="Forecast-day_weather">Max: {Math.round(weather[i].max_temp)} °C</li>
                        <li className="Forecast-day_weather">Min: {Math.round(weather[i].min_temp)} °C</li>
                        <li className="Forecast-day_weather">
                            Wind direction: {weather[i].wind_direction_compass}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
};
export default Forecast;
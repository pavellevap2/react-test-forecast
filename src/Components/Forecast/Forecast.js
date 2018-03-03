import React from "react";
import fetchForecast from "../../actions/fetchForecast";

const URL_ICON = "https://www.metaweather.com/static/img/weather";

class Forecast extends React.Component{
    constructor(props){
        super(props);
        this.state={
            weather: [],
            location:""
        }
    }

    componentWillMount(){
        fetchForecast(this.props.id)
            .then((response) => {
                this.setState({
                    weather: response.data.consolidated_weather,
                    location : response.data.title +" " + response.data.parent.title
                })
            })
    }

    render(){
        let {location} = this.state;
        let weather = this.state.weather.slice(0,5);

        return(
            <div className="Forecast">
                <h1 className="Forecast-title">{location}</h1>
                {weather.map((_, i) =>
                    <div key={i} className="Forecast-days">
                        <ul className="Forecast-day" >
                            <li className="Forecast-day_weather">
                                {i == 0 ? "Today" : i == 1 ? "Tomorrow" : weather[i].applicable_date}
                            </li>
                            <li className="Forecast-day_weather">
                                <img src={`${URL_ICON}/png/${weather[i].weather_state_abbr}.png`}
                                     alt="icon"/>
                            </li>
                            <li className="Forecast-day_weather">{weather[i].weather_state_name}</li>
                            <li className="Forecast-day_weather">Max: {Math.round(weather[i].max_temp)} °C</li>
                            <li className="Forecast-day_weather">Min: {Math.round(weather[i].min_temp)} °C</li>
                            <li className="Forecast-day_weather">
                                Wind direction: {weather[i].wind_direction_compass}
                            </li>
                        </ul>
                        <button  onClick={()=>console.log(weather)}>s</button>
                    </div>
                )}
            </div>
        )
    }
};
export default Forecast;
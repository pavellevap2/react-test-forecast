import React from "react";
import ReactDOM from "react-dom";
import {Route ,Link ,NavLink, Switch} from "react-router-dom";
import Start from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import Forecast from "../Forecast/Forecast";
import "./Root.css";
import star from "../../assets/images/star.png";

const URL_ICON = "https://www.metaweather.com/static/img/weather";

const Header = () => {
  return(
      <header>
          <ul>
              <li><NavLink exact to="/">Поиск</NavLink></li>
              <li><NavLink to="/favorites">Избранное</NavLink></li>
          </ul>
      </header>
  )
};


class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            addToFavorite: false,
            cities : [],
            weather: [],
            location: "",
            cityTitle: ""
        }
    }

    getCity(){
        fetch(`http://localhost:8082/weather/${this.state.inputValue}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cities: response.data,
                })
            }).catch((error) => console.log(error))
    }

    getWeather(woeid){
        fetch(`http://localhost:8084/city/${woeid}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    weather: response.data.consolidated_weather,
                    cityTitle : response.data.title,
                    location : response.data.parent.title
                })
            }).catch((error) => console.log(error))
    }

    render(){
        let {cities, cityTitle, location , addToFavorite} = this.state;
        let weather= this.state.weather.slice(0, 5);

        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Start
                            onChange={(e) => this.setState({inputValue : e.target.value})}
                            value={this.state.inputValue}
                            search={() => this.getCity()}
                            makeCitiesList={cities.map((_, i) =>
                                    <li key={i}>
                                         <span onClick={() => this.getWeather(cities[i].woeid)}>
                                             <Link to={`/city/${i}`}>{cities[i].title}</Link>
                                         </span>
                                        <button  onClick={() => this.setState({addToFavorite : true})}
                                                 className="btn-star" >
                                            <img className="btn-star-img" src={star} alt="star"/>
                                        </button>
                                    </li>
                            )}/>
                    )}/>

                    <Route path ="/favorites" component={Favorites} />
                    <Route path={"/city/:id" } render={()=>
                       <Forecast
                           title={cityTitle + " " + location}
                           makeForecast={weather.map((_, i) =>
                                <ul className="Forecast-day" key={i}>

                                    <li className="Forecast-day_weather">
                                        {i == 0 ? "Сегодня" : i == 1 ? "Завтра" : weather[i].applicable_date}
                                    </li>
                                    <li className="Forecast-day_weather">
                                        <img src={`${URL_ICON}/png/64/${weather[i].weather_state_abbr}.png`}
                                        alt="icon"/>
                                    </li>
                                    <li className="Forecast-day_weather">{weather[i].weather_state_name}</li>
                                    <li className="Forecast-day_weather">Max: {weather[i].max_temp} °C</li>
                                    <li className="Forecast-day_weather">Min: {weather[i].min_temp} °C</li>
                                    <li className="Forecast-day_weather">
                                        Wind direction: {weather[i].wind_direction_compass}
                                    </li>

                                </ul>
                           )}/>
                    }/>
                </Switch>
                <button onClick={() => console.log(this.state.weathers)}>w</button>
            </div>
        )
    }
}
export default Root;
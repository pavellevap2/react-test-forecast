import React from "react";
import {Route ,Link ,NavLink, Switch} from "react-router-dom";
import Start from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import Forecast from "../Forecast/Forecast";
import "./Root.css";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import * as R from "ramda";

const URL_ICON = "https://www.metaweather.com/static/img/weather";

const Header = () => {
  return(
      <header>
          <ul>
              <li><NavLink exact to="/">Search</NavLink></li>
              <li><NavLink to="/favorites">Favorites</NavLink></li>
          </ul>
      </header>
  )
};


class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            isFavorite: false,
            cities : [],
            weather: [],
            favorites : [],
            location: "",
            cityTitle: ""
        }
    }

    getCity(){
        fetch(`http://localhost:8088/weather/${this.state.inputValue}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cities: response.data,
                })
            })
            .catch((error) => console.log(error))
    }

    getWeather(woeid){
        fetch(`http://localhost:8087/city/${woeid}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    weather: response.data.consolidated_weather,
                    cityTitle : response.data.title,
                    location : response.data.parent.title
                })
            }).catch((error) => console.log(error))
    }
    addToFavorite(i){
        let {favorites, cities} = this.state;

        this.setState({
            isFavorite: true,
            favorites: R.append(cities[i], favorites)
        })
    }
    removeFromFavorites(i){
        this.setState({
            favorites : R.remove(this.state.favorites[i], this.state.favorites)
        })
    }

    render(){
        let {cities, cityTitle, location , isFavorite, favorites} = this.state;
        let weather= this.state.weather.slice(0, 5);

        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Start
                            onChange={(e) => this.setState({inputValue: e.target.value})}
                            value={this.state.inputValue}
                            pressEnter={(e) => e.key == "Enter" ? this.getCity() : false }
                            search={() => this.getCity()}

                            cities={cities.map((_, i) =>
                                    <li key={i}>
                                        <span onClick={() => this.getWeather(cities[i].woeid)}>
                                             <Link to={`/city/${i}`}>{cities[i].title}</Link>
                                         </span>

                                        <button onClick={() => this.addToFavorite(i)}
                                                className="btn-star">
                                            <img className="btn-star-img"
                                                 src={isFavorite ?  blackStar : redStar} alt="star"/>
                                        </button>
                                    </li>
                            )}/>
                    )}/>

                    <Route path ="/favorites" render={() =>
                        <Favorites
                            favorites={favorites.map((_, i) =>
                                <li key={i}>
                                        <span onClick={() => this.getWeather(favorites[i].woeid)}>
                                             <Link to={`/city/${i}`}>{favorites[i].title}</Link>
                                         </span>

                                    <button onClick={() => this.removeFromFavorites(i)}
                                            className="btn-star">
                                        <img className="btn-star-img"
                                             src={isFavorite ? blackStar : redStar} alt="star"/>
                                    </button>
                                </li>
                            )}/>
                    }/>

                    <Route path={"/city/:id" } render={()=>
                       <Forecast
                           title={cityTitle + " " + location}
                           makeForecast={weather.map((_, i) =>
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
                       />
                    }/>

                </Switch>
            </div>
        )
    }
}
export default Root;
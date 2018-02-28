import React from "react";
import {Route ,Link ,NavLink, Switch} from "react-router-dom";
import Start from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import Forecast from "../Forecast/Forecast";
import "./Root.css";
import * as R from "ramda";

let checkIn = (xs, x) => R.indexOf(x, xs) == -1 ? true : false;

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
            inputFavorites :"",
            isFavorite: false,
            cities : [],
            weather: [],
            favorites : {},
            location: "",
            cityTitle: ""
        }
    }

    getCity(){
        fetch(`http://localhost:8089/weather/${this.state.inputValue}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    cities: response.data,
                })
            })
            .catch((error) => console.log(error))
    }

    getWeather(cityWoeid){
        fetch(`http://localhost:8089/city/${cityWoeid}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    weather: response.data.consolidated_weather,
                    cityTitle : response.data.title,
                    location : response.data.parent.title
                })
            }).catch((error) => console.log(error))
    }

    addToFavorites(cityName) {
        let {cities, favorites} = this.state;

        this.setState({
            favorites: R.assoc(cities[cityName].title, cities[cityName].woeid, favorites)
        })
    }

    removeFromFavorites(cityName) {
        let {favorites} = this.state;

        this.setState({
            favorites: R.dissoc((R.keys(favorites)[cityName]), favorites)
        })
    }

    render(){
        let {inputValue, cities, cityTitle, location , favorites, inputFavorites} = this.state;
        let weather= this.state.weather.slice(0, 5);

        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Start
                            onChange={(e) => this.setState({inputValue: e.target.value})}
                            value={inputValue}
                            pressEnter={(e) => e.key == "Enter" ? this.getCity() : false }
                            search={() => this.getCity()}
                            getWeather={(woeid) => this.getWeather(woeid)}
                            addToFavorites={(i) => this.addToFavorites(i)}
                            cities={cities}
                            favorites={favorites}/>
                    )}/>

                    <Route path ="/favorites" render={() => (
                        <Favorites
                            onChange={(e) => this.setState({inputFavorites: e.target.value})}
                            value={inputFavorites}
                            favorites={favorites}
                            getWeather={(i) => this.getWeather(i)}
                            removeFromFavorites={(i) => this.removeFromFavorites(i)}/>
                    )}/>

                    <Route path={"/city/:id" } render={()=>
                       <Forecast
                           title={cityTitle + " " + location}
                           weather={weather}/>
                    }/>
                </Switch>
            </div>
        )
    }
}
export {Root, checkIn};
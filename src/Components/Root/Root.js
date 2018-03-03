import React from "react";
import fetchCities from "../../actions/fetchCities"
import {Route ,NavLink, Switch} from "react-router-dom";
import Start from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import Forecast from "../Forecast/Forecast";
import "./Root.css";
import * as R from "ramda";

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
            cities : {},
            favorites : {},
            weather: [],
            location: "",
        }
    }

    loadCities(cityNameInput){
        fetchCities(cityNameInput)
            .then( (rensponse) => {
                let citiesArr = rensponse.data;
                let cities = citiesArr.reduce((z, c) => { z[c.title] = c.woeid; return z }, {} );
                this.setState({
                   cities: R.merge(cities, this.state.cities)
                })
            })
    }

    addToFavorites(cityName) {
        let {favorites} = this.state;

        this.setState({
            favorites: R.assoc(cityName, true , favorites)
        })
    }

    removeFromFavorites(cityName) {
        let {favorites} = this.state;
        let favoritesCities = R.keys(favorites);

        this.setState({
            favorites: R.dissoc(favoritesCities[cityName], favorites)
        })
    }

    render(){
        let {cities, location, favorites} = this.state;
        let weather = this.state.weather.slice(0, 5);

        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Start
                            loadCities={(cityNameInput) => this.loadCities(cityNameInput)}
                            addToFavorites={(id) => this.addToFavorites(id)}
                            cities={cities}
                            favorites={favorites}/>
                    )}/>

                    <Route path ="/favorites" render={() => (
                        <Favorites
                            favorites={favorites}
                            cities={cities}
                            getWeather={(i) => this.loadForecast(i)}
                            removeFromFavorites={(id) => this.removeFromFavorites(id)}/>
                    )}/>

                    <Route path={"/city/:id" } render={()=>
                       <Forecast
                           title={location}
                           weather={weather}/>
                    }/>
                </Switch>
            </div>
        )
    }
}
export default Root;
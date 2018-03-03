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

    loadCities(cities){
        fetchCities(cities)
            .then( (rensponse) => {
                let citiesArr = rensponse.data;
                let cities = citiesArr.reduce((z, c) => { z[c.title] = c.woeid; return z }, {} );
                this.setState({
                   cities: R.merge(cities, this.state.cities)
                })
            })
    }

    addToFavorites(woeid) {
        let {favorites} = this.state;

        this.setState({
            favorites: R.assoc(woeid, true , favorites)
        })
    }

    removeFromFavorites(id) {
        let {favorites} = this.state;
        let favoritesId = R.keys(favorites);

        this.setState({
            favorites: R.dissoc(favoritesId[id], favorites)
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
                            search={(cities) => this.loadCities(cities)}
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
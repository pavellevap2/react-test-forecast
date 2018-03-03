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

let citiesList = [
    { title: "San Francisco", location_type: "City", woeid: 2487956, },
    { title: "San Diego", location_type: "City", woeid: 2487889, },
    { title: "San Jose", location_type: "City", woeid: 2488042, },
    { title: "San Antonio", location_type: "City", woeid: 2487796, },
    { title: "Santa Cruz", location_type: "City", woeid: 2488853, },
    { title: "Santiago", location_type: "City", woeid: 349859, },
    { title: "Santorini", location_type: "City", woeid: 56558361, },
    { title: "Santander", location_type: "City", woeid: 773964, },
];


class Root extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            searchQuery: "",
            cities : {},
            favorites : {},
            weather: [],
            location: "",
        }
    }

    getSearchValue = (searchValue) => {
        this.setState({
            searchQuery : searchValue
        })
    };

    loadCities(){
        let cities = citiesList.reduce((z, c) => { z[c.title] = c.woeid; return z }, {} );
        this.setState({
            cities: R.merge(cities, this.state.cities)
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
                            passingSearchValue = {this.getSearchValue}
                            search={() => this.loadCities()}
                            getWeather={(woeid) => this.loadForecast(woeid)}
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
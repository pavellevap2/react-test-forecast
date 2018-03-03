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
            cities : {"San Francisco":2487956, "San Diego":  2487889, "Santa Cruz": 2488853, "Santiago" :349859},
            favorites : {},
            weather: [],
            location: "",
        }
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
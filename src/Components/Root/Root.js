import React from "react";
import fetchCities from "../../actions/fetchCities"
import {Route ,NavLink, Switch} from "react-router-dom";
import Start from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import Forecast from "../Forecast/Forecast";
import "./Root.css";
import * as R from "ramda";
import {minToMs} from "../../helpers/helpers";

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
            cityId  :""
        }
    }

    componentWillMount(){
        this.setState({
            cities: JSON.parse(localStorage.getItem("cities")),
            favorites: JSON.parse(localStorage.getItem("favorites"))
        })
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

    componentWillUpdate(nextProps, nextState){
        localStorage.setItem("cities", JSON.stringify(nextState.cities));
        localStorage.setItem("favorites", JSON.stringify(nextState.favorites));
    }

    componentDidUpdate(){
        setInterval(() => localStorage.clear(), minToMs(15))
    }

    addToFavorites(cityName) {
        let {favorites} = this.state;

        this.setState({
            favorites: R.assoc(cityName, true, favorites)
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
        let {cities, favorites, cityId} = this.state;

        return(
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" render={()=>(
                        <Start
                            loadCities={(cityNameInput) => this.loadCities(cityNameInput)}
                            addToFavorites={(id) => this.addToFavorites(id)}
                            loadForecast={(id) => this.setState({cityId :id})}
                            cities={cities}
                            favorites={favorites}/>
                    )}/>

                    <Route path ="/favorites" render={() => (
                        <Favorites
                            favorites={favorites}
                            cities={cities}
                            removeFromFavorites={(id) => this.removeFromFavorites(id)}
                            loadForecast={(id) => this.setState({cityId :id})}/>
                    )}/>

                    <Route path={"/weather/:id" } render={()=>
                       <Forecast
                       id={cityId}
                       />
                    }/>
                </Switch>
            </div>
        )
    }
}
export default Root;
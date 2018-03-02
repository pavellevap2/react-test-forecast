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
            searchQuery: "",
            cities : [],
            weather: [],
            favorites : {},
            location: "",
        }
    }

    getSearchValue = (searchValue) => {
        this.setState({
            searchQuery : searchValue
        })
    };

    fetchCity(){
        fetch(`http://localhost:8089/weather/${this.state.searchQuery}`)
            .then((response) => response.json())
            .then((response) => {
                let cityArr = response.data
                let cities = cityArr.reduce((z, c, i)=>{
                    z[i]= c; return z }, {});
                console.log(cities);

                this.setState({
                    cities: response.data,
                })
            })
            .catch((error) => alert("Ошибка :" + error))
    }

    getWeather(woeid){
        fetch(`http://localhost:8089/city/${woeid}`)
            .then((response) => response.json())
            .then((response) => {
                this.setState({
                    weather: response.data.consolidated_weather,
                    location : response.data.title +" " + response.data.parent.title
                })
            })
            .catch((error) => alert("Ошибка :" + error))
    }

    addToFavorites(id) {
        let {cities, favorites} = this.state;

        this.setState({
            favorites: R.assoc(cities[id].title, cities[id].woeid, favorites)
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
                            search={() => this.fetchCity()}
                            getWeather={(woeid) => this.getWeather(woeid)}
                            addToFavorites={(id) => this.addToFavorites(id)}
                            cities={cities}
                            favorites={favorites}/>
                    )}/>

                    <Route path ="/favorites" render={() => (
                        <Favorites
                            favorites={favorites}
                            getWeather={(i) => this.getWeather(i)}
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
export {Root, checkIn};
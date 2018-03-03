import React from "react";
import {Link} from "react-router-dom";
import searchImg from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import * as R from "ramda";

let checkIn = (xs, x) => R.indexOf(x, xs) == -1 ? false : true;

let filterCities = (cities, inputCity) => cities.filter(cityName => new RegExp(inputCity).test(cityName)) ;

let filter = (obj, keys) => keys.reduce((z, x) => (z[x] = obj[x], z), {});

class Start extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue : ""
        }
    }

    render(){
        let {searchValue} = this.state;
        let availibleCities = R.keys(this.props.cities);
        let filteredCities = filterCities(availibleCities, searchValue);

        let cities = filteredCities.length > 0 ? filter(this.props.cities, filteredCities) : null;

        let citiesTitles = R.keys(cities);
        let favorites = R.keys(this.props.favorites);

        return(
            <div className="main">
                <div className="main-input">
                    <input type="text"
                           placeholder="Enter a сity"
                           onChange={(e) => this.setState({searchValue : e.target.value})}
                           value={this.state.searchValue}/>

                    <button className="btn_search"
                            onClick={cities == null ? () => this.props.loadCities(searchValue) : undefined}>
                        <img src={searchImg} alt="search"/>
                    </button>
                </div>
                <div className="cities">
                    <ul> {searchValue.length > 0
                        ? citiesTitles.map((x, i) =>
                            <li key={i}>
                                     <span onClick={() => this.props.loadForecast(cities[x])}>
                                         <Link to={`/city/${i}`}>{citiesTitles[i]}</Link>
                                     </span>

                                <button onClick={() => this.props.addToFavorites(citiesTitles[i])} className="btn-star">
                                    <img className="btn-star-img"
                                         src={checkIn(favorites, String(citiesTitles[i])) ? blackStar : redStar}
                                         alt="star"/>
                                </button>
                                <button onClick={() => console.log(citiesTitles[i])}>s</button>
                            </li>
                        ): null
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Start;
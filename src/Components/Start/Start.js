import React from "react";
import {Link} from "react-router-dom";
import searchImg from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import * as R from "ramda";

let checkIn = (xs, x) => R.indexOf(x, xs) == -1 ? false : true;

let filter = (db, keys) => keys.reduce((a, key) => (a[key] = db[key], a), {})

let searchedCities = (xs, x) => {
    xs = xs.filter(cityName => new RegExp(x).test(cityName));
    return xs;
};

class Start extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue : ""
        }
    }

    handleSearch = (event) => {
        let searchValue = event.target.value;

        this.setState({
            searchValue: event.target.value
        }, () => this.props.passingSearchValue(searchValue))
    };

    render(){
        let cities = R.keys(this.props.cities) ;
        let {searchValue} = this.state;
        let citiesId = R.values(this.props.cities);
        let favorites = R.keys(this.props.favorites);

        let search = () => {
            return searchedCities( cities, searchValue).length > 0
                ? cities = R.keys(filter(this.props.cities, searchedCities( cities, searchValue)))
                : this.props.search;

        };

        return(
            <div className="main">
                <div className="main-input">
                    <input type="text"
                           placeholder="Enter a сity"
                           onChange={(event) => this.handleSearch(event)}
                           value={this.state.searchValue}/>

                    <button className="btn_search"
                            onClick={search()}>
                        <img src={searchImg} alt="search"/>
                    </button>
                </div>
                <div className="cities">
                    <ul> {this.state.searchValue.length > 0 ?
                        cities.map((x, i) =>
                            <li key={i}>
                                     <span onClick={() => this.props.loadForecast(citiesId[i])}>
                                         <Link to={`/city/${i}`}>{cities[i]}</Link>
                                     </span>

                                <button onClick={() => this.props.addToFavorites(citiesId[i])} className="btn-star">
                                    <img className="btn-star-img"
                                         src={checkIn(favorites, String(citiesId[i])) ? blackStar : redStar}
                                         alt="star"/>
                                </button>
                            </li>
                        ) :null
                    }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Start;
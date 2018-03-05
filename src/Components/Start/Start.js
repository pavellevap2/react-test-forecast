import React from "react";
import {Link} from "react-router-dom";
import searchImg from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import * as R from "ramda";
import {filterCities, checkIn} from "../../helpers/helpers";

class Start extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue : ""
        }
    }

    handleClick(){
        let {searchValue} = this.state;
        let filteredCities = filterCities(R.keys(this.props.cities), searchValue);

        if(!filteredCities.length){
            return this.props.loadCities(searchValue)
        }
    }

    render(){
        let {searchValue} = this.state;
        let cities = this.props.cities;
        let availableCities = R.keys(cities);

        let filteredCities = filterCities(availableCities, searchValue);
        let favorites = R.keys(this.props.favorites);

        return(
            <div className="main">
                <div className="main-input">
                    <input type="text" placeholder="Enter a сity"
                           onChange={(e) => this.setState({searchValue : e.target.value})}
                           value={this.state.searchValue}/>

                    <button className="btn_search"
                            onClick={() => this.handleClick()}>
                        <img src={searchImg} alt="search"/>
                    </button>
                </div>
                <div className="cities">
                    <ul>
                        {searchValue.length > 0
                            ? filteredCities.map((x, i) =>
                                <li key={i}>
                                         <span><Link to={`/weather/${cities[x]}`}>{x}</Link></span>

                                    <button onClick={() => this.props.addToFavorites(x)} className="btn-star">
                                        <img className="btn-star-img"
                                             src={checkIn(favorites, String(x)) ? blackStar : redStar} alt="star"/>
                                    </button>
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
import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import {checkIn} from "../Root/Root";
import * as R from "ramda";

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
        let cities = R.values(this.props.cities);
        let citiesId = R.keys(this.props.cities);
        let favorites = R.keys(this.props.favorites);

        return(
            <div className="main">
                <div className="main-input">
                    <input type="text"
                           placeholder="Enter a сity"
                           onChange={(event) => this.handleSearch(event)}
                           value={this.state.searchValue}/>

                    <button className="btn_search" onClick={this.props.search}>
                        <img src={search} alt="search"/>
                    </button>
                </div>
                <div className="cities">
                    <ul>
                        {cities.map((x, i) =>
                            <li key={i}>
                                     <span onClick={()=>this.props.getWeather(citiesId[i])}>
                                         <Link to={`/city/${i}`}>{cities[i]}</Link>
                                     </span>

                                <button onClick={() => this.props.addToFavorites(citiesId[i])} className="btn-star">
                                    <img className="btn-star-img"
                                         src={checkIn(favorites, String(citiesId[i])) ?  redStar : blackStar}
                                         alt="star"/>
                                </button>
                                <button onClick={() => console.log(citiesId[i])}> s</button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Start;
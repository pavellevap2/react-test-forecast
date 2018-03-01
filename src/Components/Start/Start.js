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
        let searchQuery = event.target.value;

        this.setState({
            searchValue: event.target.value
        }, () => this.props.passingProps(searchQuery))
    };

    render(){
        let {favorites, cities} = this.props;
        let favoritesTitles = R.keys(favorites);

        return(
                <div className="main">
                    <div className="main-input">
                        <input type="text"
                               placeholder="Enter a сity"
                               onChange={(event) => this.handleSearch(event)}
                               value={this.state.searchValue}
                        />
                        <button className="btn_search" onClick={this.props.search}>
                            <img src={search} alt="search"/>
                        </button>
                    </div>
                    <div className="cities">
                        <ul>
                            {cities.map((_, i) =>
                                <li key={i}>
                                     <span onClick={()=>this.props.getWeather(cities[i].woeid)}>
                                         <Link to={`/city/${i}`}>{cities[i].title}</Link>
                                     </span>

                                    <button onClick={() => this.props.addToFavorites(i)} className="btn-star">
                                        <img className="btn-star-img"
                                             src={checkIn(favoritesTitles, cities[i].title)?  redStar : blackStar} alt="star"/>
                                    </button>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            )
    }
}

export default Start;
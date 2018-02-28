import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import {checkIn} from "../Root/Root";

let Start = (props) => {
    let cities = props.cities;
    let favorites = props.favorites;

    return(
        <div className="main">
            <div className="main-input">
                <input type="text"
                       placeholder="Enter a сity "
                       onChange={props.onChange}
                       value={props.value}
                       onKeyPress={props.pressEnter}
                />
                <button className="btn_search" onClick={props.search}>
                    <img src={search} alt="search"/>
                </button>
            </div>
            <div className="cities">
                <ul>
                    {cities.map((_, i) =>
                        <li key={i}>
                            <span onClick={props.getWeather(cities[i].woeid)}>
                                <Link to={`/city/${i}`}>{cities[i].title}</Link>
                                    </span>

                            <button onClick={props.addToFavorite(i)}
                                    className="btn-star">
                                <img className="btn-star-img"
                                     src={checkIn(favorites, cities[i])?  redStar : blackStar} alt="star"/>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )

};

export default Start;
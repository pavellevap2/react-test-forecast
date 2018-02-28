import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import blackStar from "../../assets/images/blackStar.png";
import redStar from  "../../assets/images/redStar.png";
import {checkIn} from "../Root/Root";
import * as R from "ramda";

let Start = (props) => {
    let {cities, favorites} = props;
    let favoritesTitles = R.keys(favorites);

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
                             <span onClick={()=>props.getWeather(cities[i].woeid)}>
                                 <Link to={`/city/${i}`}>{cities[i].title}</Link>
                             </span>

                            <button onClick={() => props.addToFavorites(i)} className="btn-star">
                                <img className="btn-star-img"
                                     src={checkIn(favoritesTitles, cities[i].title)?  redStar : blackStar} alt="star"/>
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )

};

export default Start;
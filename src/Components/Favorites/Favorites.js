import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import del from "../../assets/images/delete.png";
import * as R from "ramda";


let Favorites = (props) =>{
    let {favorites} = props;
    let favoritesWoeid = R.values(favorites);
    let favoritesTitles = R.keys(favorites);

    return(
        <div>
            <div className="main">
                <div className="main-input">
                    <input type="text"
                           placeholder="Enter a сity"
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
                        {favoritesWoeid.map((_, i) =>
                            <li key={i}>
                                 <span onClick={() => props.getWeather(favoritesWoeid[i])}>
                                     <Link to={`/city/${i}`}>{favoritesTitles[i]}</Link>
                                 </span>

                                <button onClick={() => props.removeFromFavorites(i)}
                                        className="btn-star">
                                    <img className="btn-star-img"
                                         src={del} alt="star"/>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
};
export default Favorites;
import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import del from "../../assets/images/delete.png"


let Favorites = (props) =>{
    let {favorites} = props;

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
                        {favorites.map((_, i) =>
                            <li key={i}>
                                 <span onClick={() => props.getWeather(favorites[i].woeid)}>
                                     <Link to={`/city/${i}`}>{favorites[i].title}</Link>
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
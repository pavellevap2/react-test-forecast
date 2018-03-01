import React from "react";
import {Link} from "react-router-dom";
import search from "../../assets/images/zoom.ico";
import del from "../../assets/images/delete.png";
import * as R from "ramda";


class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue: ""
        }
    }
    render(){
        let {favorites} = this.props;
        let favoritesWoeid = R.values(favorites);
        let favoritesTitles = R.keys(favorites);

        return(
            <div>
                <div className="main">
                    <div className="main-input">
                        <input type="text"
                               onChange={(e) => this.setState({searchValue : e.target.value})}
                               value={this.state.searchValue}
                               disabled={true}
                               placeholder="doesn't work"/>
                        <button className="btn_search"
                                disabled={true}
                                onClick={this.props.search}>
                            <img src={search} alt="search"/>
                        </button>
                    </div>
                    <div className="cities">
                        <ul>
                            {favoritesWoeid.map((_, i) =>
                                <li key={i}>
                                 <span onClick={() => this.props.getWeather(favoritesWoeid[i])}>
                                     <Link to={`/city/${i}`}>{favoritesTitles[i]}</Link>
                                 </span>

                                    <button onClick={() => this.props.removeFromFavorites(i)}
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
    }
};
export default Favorites;
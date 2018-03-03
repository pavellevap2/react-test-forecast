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
        let {favorites, cities} = this.props;
        let favoritesCities = R.keys(favorites);

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
                            {favoritesCities.map((x, i) =>
                                <li key={i}>
                                 <span onClick={() => this.props.loadForecast(cities[x])}>
                                     <Link to={`/city/${i}`}>{favoritesCities[i]}</Link>
                                 </span>

                                    <button onClick={() => this.props.removeFromFavorites(i)}
                                            className="btn-star">
                                        <img className="btn-star-img"
                                             src={del} alt="star"/>
                                    </button>
                                    <button onClick={() => console.log( favoritesCities)}>sd</button>
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
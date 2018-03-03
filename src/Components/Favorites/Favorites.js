import React from "react";
import {Link} from "react-router-dom";
import del from "../../assets/images/delete.png";
import * as R from "ramda";
import {filter, filterCities} from "../../helpers/helpers";


class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue: ""
        }
    }
    render(){
        let {cities} = this.props;
        let availibleFavorites = R.keys(this.props.favorites);
        let filtredFavorites = filterCities(availibleFavorites, this.state.searchValue);

        let favorites = filtredFavorites.length > 0 ? filter(this.props.favorites, filtredFavorites) : null;
        let favoritesCities = R.keys(favorites);

        return(
            <div>
                <div className="main">
                    <div className="main-input">
                        <input type="text"
                               onChange={(e) => this.setState({searchValue : e.target.value})}
                               value={this.state.searchValue}
                               placeholder="Search favorite cities"/>
                    </div>
                    <div className="cities">
                        <ul>
                            {this.state.searchValue.length > 0 ?
                                favoritesCities.map((x, i) =>
                                    <li key={i}>
                                     <span onClick={() => this.props.loadForecast(cities[x])}>
                                         <Link to={`/city/${i}`}>{x}</Link>
                                     </span>

                                        <button onClick={() => this.props.removeFromFavorites(i)}
                                                className="btn-star">
                                            <img className="btn-star-img"
                                                 src={del} alt="star"/>
                                        </button>
                                    </li>
                                ) : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};
export default Favorites;
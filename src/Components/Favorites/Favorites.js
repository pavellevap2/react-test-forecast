import React from "react";
import {Link} from "react-router-dom";
import del from "../../assets/images/delete.png";
import * as R from "ramda";
import {filterCities} from "../../helpers/helpers";


class Favorites extends React.Component{
    constructor(props){
        super(props);
        this.state={
            searchValue: ""
        }
    }
    render(){
        let {cities, favorites} = this.props;
        let availibleFavorites = R.keys(favorites);
        let filtredFavorites = filterCities(availibleFavorites, this.state.searchValue);

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
                            {filtredFavorites.map((x, i) =>
                                    <li key={i}>
                                     <span onClick={() => this.props.loadForecast(cities[x])}>
                                         <Link to={`/weather/${i}`}>{x}</Link>
                                     </span>

                                        <button onClick={() => this.props.removeFromFavorites(i)}
                                                className="btn-star">
                                            <img className="btn-star-img"
                                                 src={del} alt="star"/>
                                        </button>
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
};
export default Favorites;
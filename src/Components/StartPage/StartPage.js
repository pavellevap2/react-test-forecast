import React from "react";
import * as R from "ramda";
import star from "../../assets/images/star.png";
import {Link, Route} from "react-router-dom";

let test = [{"title":"San Francisco","location_type":"City","woeid":2487956,"latt_long":"37.777119, -122.41964"},{"title":"San Diego","location_type":"City","woeid":2487889,"latt_long":"32.715691,-117.161720"},{"title":"San Jose","location_type":"City","woeid":2488042,"latt_long":"37.338581,-121.885567"},{"title":"San Antonio","location_type":"City","woeid":2487796,"latt_long":"29.424580,-98.494614"},{"title":"Santa Cruz","location_type":"City","woeid":2488853,"latt_long":"36.974018,-122.030952"},{"title":"Santiago","location_type":"City","woeid":349859,"latt_long":"-33.463039,-70.647942"},{"title":"Santorini","location_type":"City","woeid":56558361,"latt_long":"36.406651,25.456530"},{"title":"Santander","location_type":"City","woeid":773964,"latt_long":"43.461498,-3.810010"},{"title":"Busan","location_type":"City","woeid":1132447,"latt_long":"35.170429,128.999481"},{"title":"Santa Cruz de Tenerife","location_type":"City","woeid":773692,"latt_long":"28.46163,-16.267059"},{"title":"Santa Fe","location_type":"City","woeid":2488867,"latt_long":"35.666431,-105.972572"}];

class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            cities : [],
        }
    }

    getWeather(){
        fetch(test)
            .then(() => {
                return this.setState({
                    cities : test,
                })
            })
    }

    render(){
       let {cities} = this.state;

        return(
            <div className="StartPage">
                <div className="StartPage-input">
                    <input type="text"
                        onChange={(e) => this.setState({inputValue : e.target.value})}
                        value={this.state.inputValue}
                    />
                    <button onClick={() => this.getWeather()}>get</button>
                </div>
                <div className="StartPage-cities">
                    <ul>
                        {cities.map((_, i) =>
                            <li key={i}>
                                <span>
                                    <Link to={`/city/${i}`}>{this.state.cities[i].title}</Link>
                                </span>
                                <button  className="btn-star" >
                                    <img className="btn-star-img" src={star} alt="star"/>
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}
export default StartPage;
import React from "react";
import * as R from "ramda";
import star from "../../assets/images/star.png";
import {Link, Route} from "react-router-dom";

class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            cities : [],
        }
    }

    getWeather(){
        fetch(`http://localhost:8080/weather/?query=${this.state.inputValue}` )
            .then((response) => response.json())
            .then((response) => {
                 this.setState({
                     cities: response.data
                 })
            }).catch((error) => console.log(error))
    }

    render(){
       let {cities} = this.state;

        return(
            <div className="Start">
                <div className="Start-input">
                    <input type="text"
                        onChange={(e) => this.setState({inputValue : e.target.value})}
                        value={this.state.inputValue}
                    />
                    <button onClick={() => this.getWeather()}>get</button>
                </div>
                <div className="Start-cities">
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
                    <button onClick={()=> console.log(cities)}> </button>
                </div>
            </div>
        )
    }
}
export default StartPage;
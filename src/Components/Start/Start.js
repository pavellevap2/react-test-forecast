import React from "react";
import * as R from "ramda";
import star from "../../assets/images/star.png";
import {Link, Route} from "react-router-dom";

let StartPage = (props) => {
    return(
        <div className="Start">
            <div className="Start-input">
                <input type="text"
                onChange={props.onChange}
                value={props.value}/>
                <button onClick={props.search}>search</button>
            </div>
            <div className="Start-cities">
                <ul>
                    {props.makeCitiesList }
                </ul>
            </div>
            <button onClick={()=>console.log(props.cities.map((_,i) => i ))}> s</button>

        </div>
    )

};
export default StartPage;
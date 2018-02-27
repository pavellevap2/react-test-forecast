import React from "react";

let Forecast = (props) => {
    return(
        <div className="Forecast">
            <h1 className="Forecast-title">{props.title}</h1>
            {props.makeForecast}
        </div>
    )
};
export default Forecast;
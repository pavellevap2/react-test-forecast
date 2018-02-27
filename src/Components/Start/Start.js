import React from "react";
import search from "../../assets/images/zoom.ico"

let StartPage = (props) => {
    return(
        <div className="Start">
            <div className="Start-input">
                <input type="text"
                       placeholder="Enter a сity "
                       onChange={props.onChange}
                       value={props.value}
                       onKeyPress={props.pressEnter}
                />
                <button className="Start-btn_search" onClick={props.search}>
                    <img src={search} alt="search"/>
                </button>
            </div>
            <div className="Start-cities">
                <ul>
                    {props.cities}
                </ul>
            </div>
        </div>
    )

};
export default StartPage;
import React from "react";
import search from "../../assets/images/zoom.ico"

let Favorites = (props) =>{
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
                        <li>{}</li>
                        {props.favorites}
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Favorites;
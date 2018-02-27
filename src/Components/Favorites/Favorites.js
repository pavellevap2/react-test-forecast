import React from "react";

let Favorites = (props) =>{
    return(
        <div>
            <div className="Start">
                <div className="Start-input">
                    {/*форма поиска по избранным будет позже*/}
                    </div>
                <div className="Start-cities">
                    <ul>
                        {props.favorites}
                    </ul>
                </div>
            </div>
        </div>
    )

}
export default Favorites;
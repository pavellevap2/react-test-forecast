import React from "react";

class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            cities : [],
        }
    }

    getWeather(){
        let url = "https://www.metaweather.com/api/location/search/?query=london";

        fetch(url, {method : "GET"})
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    cities : data[0] ,
                })
            })
            .catch( (error) => {
            console.log("Request failed", error)
        })
    }

    render(){
        return(
            <div className="StartPage">
                <div className="StartPage-input">
                    <input type="text"
                        onChange={(e) => this.setState({inputValue : e.target.value})}
                        value={this.state.inputValue}
                    />
                    <button onClick={() => this.getWeather()}>get</button>
                    <button onClick={() => this.state.cities}>test</button>
                </div>
            </div>
        )
    }
}
export default StartPage;
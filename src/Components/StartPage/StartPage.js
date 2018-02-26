import React from "react"

class StartPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            inputValue: "",
            cities : [],
        }
    }

    getWeather(){
        let url = "https://www.metaweather.com/api/location/44418/";

        fetch(url, { mode: "no-cors" })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    cities : data.consolidated_weather
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
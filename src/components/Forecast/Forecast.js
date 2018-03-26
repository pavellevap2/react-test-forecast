import React from 'react'

const URL_ICON = 'https://www.metaweather.com/static/img/weather'

class Forecast extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.forecastFetchData(this.props.match.params.id)
  }

  render() {
    const forecast = this.props.forecast.weather.splice(0, 5)
    const location = this.props.forecast.location

    return (
      <div className="Forecast">
        <h1 className="Forecast-title">{location}</h1>
        {forecast.map((_, i) => (
          <div key={i} className="Forecast-days">
            <ul className="Forecast-day">
              <li className="Forecast-day_weather">
                {' '}
                {i == 0
                  ? 'Today'
                  : i == 1 ? 'Tomorrow' : forecast[i].applicable_date}
              </li>
              <li className="Forecast-day_weather">
                <img
                  src={`${URL_ICON}/png/${forecast[i].weather_state_abbr}.png`}
                  alt="icon"
                />
              </li>
              <li className="Forecast-day_weather">
                {' '}
                {forecast[i].weather_state_name}
              </li>
              <li className="Forecast-day_weather">
                Max: {Math.round(forecast[i].max_temp)}° C{' '}
              </li>
              <li className="Forecast-day_weather">
                Min: {Math.round(forecast[i].min_temp)}° C{' '}
              </li>
              <li className="Forecast-day_weather">
                Wind direction: {forecast[i].wind_direction_compass}
              </li>
            </ul>
          </div>
        ))}
      </div>
    )
  }
}
export default Forecast

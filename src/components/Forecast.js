import React from 'react'
import styled from 'styled-components'

const URL_ICON = 'https://www.metaweather.com/static/img/weather'

const ForecastComponent = styled.div`
  margin-top: 2%;
`
const ForecastTitle = styled.h1`
  text-align: center;
  text-shadow: 1px 1px 1px red;
  color: black;
  font-size: 55px;
  font-weight: bold;
  padding: 5px;
`
const ForecastDays = styled.div`
  display: inline-flex;
  position: relative;
  justify-content: flex-start !important;
  flex-wrap: wrap;
  left: 5%;
  right: 25%;
  margin: 1%;
`
const ForecastDay = styled.div`
  white-space: pre-wrap;
`
const DayForecat = styled.li`
  padding:10px 20px;
  &:first-child {
    color: red;
    font-size: 27px;
    font-weight: bold;
    }
  }
`
const ForecastImg = styled.img`
  width: 5vh;
  height: 5vh;
`

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
      <ForecastComponent>
        <ForecastTitle>{location}</ForecastTitle>
        {forecast.map((_, i) => (
          <ForecastDays key={i}>
            <ForecastDay>
              <DayForecat>
                {i == 0
                  ? 'Today'
                  : i == 1 ? 'Tomorrow' : forecast[i].applicable_date}
              </DayForecat>

              <DayForecat>
                <ForecastImg
                  src={`${URL_ICON}/png/${forecast[i].weather_state_abbr}.png`}
                  alt="icon"
                />
              </DayForecat>

              <DayForecat>{forecast[i].weather_state_name}</DayForecat>

              <DayForecat>
                Max: {Math.round(forecast[i].max_temp)}° C{' '}
              </DayForecat>
              <DayForecat>
                Min: {Math.round(forecast[i].min_temp)}° C{' '}
              </DayForecat>
              <DayForecat className="Forecast-day_weather">
                Wind direction: {forecast[i].wind_direction_compass}
              </DayForecat>
            </ForecastDay>
          </ForecastDays>
        ))}
      </ForecastComponent>
    )
  }
}
export default Forecast

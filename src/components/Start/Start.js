import React from 'react'
import { Link } from 'react-router-dom'
import searchImg from '../../assets/images/zoom.ico'
import blackStar from '../../assets/images/blackStar.png'
import redStar from '../../assets/images/redStar.png'
import * as R from 'ramda'
import { filterCities, checkIn } from '../../helpers/helpers'
import favorites from '../../reducers/favorites'

class Start extends React.Component {
  constructor(props) {
    super(props)
  }

  searchCities() {
    const { cityName, citiesFetchData, filteredCities } = this.props

    if (!filteredCities.length) {
      citiesFetchData(cityName)
    }
  }

  render() {
    const {
      cityName,
      inputCity,
      filteredCities,
      cities,
      addToFavorites,
    } = this.props
    const favorites = R.keys(this.props.favorites)

    return (
      <div className="main">
        <div className="main-input">
          <input
            type="text"
            placeholder="Enter a сity"
            onChange={e => inputCity(e.target.value)}
            value={cityName}
          />

          <button className="btn_search" onClick={() => this.searchCities()}>
            <img src={searchImg} alt="search" />
          </button>
        </div>
        <div className="cities">
          <ul>
            {cityName.length
              ? filteredCities.map((city, i) => (
                  <li key={i}>
                    <span>
                      <Link to={`/weather/${cities[city]}`}>{city}</Link>
                    </span>
                    <button
                      onClick={() => addToFavorites(city, cities[city])}
                      className="btn-star"
                    >
                      <img
                        className="btn-star-img"
                        src={
                          checkIn(favorites, String(city)) ? blackStar : redStar
                        }
                        alt="star"
                      />
                    </button>
                  </li>
                ))
              : null}
          </ul>
        </div>
      </div>
    )
  }
}

export default Start

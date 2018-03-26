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
    this.state = {
      searchValue: '',
    }
  }

  searchCities() {
    let { searchValue } = this.state
    let filteredCities = filterCities(R.keys(this.props.cities), searchValue)

    if (!filteredCities.length) {
      this.props.citiesFetchData(searchValue)
    }
  }

  render() {
    const { searchValue } = this.state
    const { cities, addToFavorites } = this.props
    const availableCities = R.keys(cities)

    const filteredCities = filterCities(availableCities, searchValue)
    const favorites = R.keys(this.props.favorites)

    return (
      <div className="main">
        <div className="main-input">
          <input
            type="text"
            placeholder="Enter a сity"
            onChange={e => this.setState({ searchValue: e.target.value })}
            value={this.state.searchValue}
          />

          <button className="btn_search" onClick={() => this.searchCities()}>
            <img src={searchImg} alt="search" />
          </button>
        </div>
        <div className="cities">
          <ul>
            {searchValue.length
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

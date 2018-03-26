import React from 'react'
import { Link } from 'react-router-dom'
import del from '../../assets/images/delete.png'
import * as R from 'ramda'
import { filterCities } from '../../helpers/helpers'

class Favorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: '',
    }
  }

  render() {
    const { favorites, removeFromFavorites } = this.props
    const { searchValue } = this.state
    const availableFavorites = R.keys(favorites)
    const filteredFavorites = filterCities(availableFavorites, searchValue)

    return (
      <div>
        <div className="main">
          <div className="main-input">
            <input
              type="text"
              onChange={e => this.setState({ searchValue: e.target.value })}
              value={searchValue}
              placeholder="Search favorite cities"
            />
          </div>
          <div className="cities">
            <ul>
              {filteredFavorites.map((city, i) => (
                <li key={i}>
                  <span>
                    <Link to={`/weather/${favorites[city]}`}>{city}</Link>
                  </span>

                  <button
                    onClick={() => removeFromFavorites(i)}
                    className="btn-star"
                  >
                    <img className="btn-star-img" src={del} alt="star" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Favorites

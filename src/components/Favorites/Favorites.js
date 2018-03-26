import React from 'react'
import { Link } from 'react-router-dom'
import del from '../../assets/images/delete.png'

class Favorites extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      favorites,
      removeFromFavorites,
      favoriteCity,
      inputFavorite,
      filteredFavorites,
    } = this.props

    return (
      <div>
        <div className="main">
          <div className="main-input">
            <input
              type="text"
              onChange={e => inputFavorite(e.target.value)}
              value={favoriteCity}
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
                    onClick={() => removeFromFavorites(city)}
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

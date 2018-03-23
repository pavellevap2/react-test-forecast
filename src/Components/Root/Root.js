import React from 'react'
import autoBind from 'auto-bind'
import fetchCities from '../../actions/fetchCities'
import { Route, NavLink, Switch } from 'react-router-dom'
import Start from '../Start/Start'
import Favorites from '../Favorites/Favorites'
import Forecast from '../Forecast/Forecast'
import './Root.css'
import * as R from 'ramda'
import { minToMs } from '../../helpers/helpers'

const Header = () => {
  return (
    <header>
      <ul>
        <li>
          <NavLink exact to="/">
            Search
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites">Favorites</NavLink>
        </li>
      </ul>
    </header>
  )
}

class Root extends React.Component {
  constructor(props) {
    super(props)
    autoBind(this)

    this.state = {
      cities: {},
      favorites: {},
    }
  }

  componentWillMount() {
    this.setState({
      cities: JSON.parse(localStorage.getItem('cities')),
      favorites: JSON.parse(localStorage.getItem('favorites')),
    })
  }

  loadCities(cityNameInput) {
    fetchCities(cityNameInput).then(response => {
      let cities = response.reduce((z, c) => {
        z[c.title] = c.woeid
        return z
      }, {})
      this.setState({
        cities: R.merge(cities, this.state.cities),
      })
    })
  }

  componentWillUpdate(_, nextState) {
    localStorage.setItem('cities', JSON.stringify(nextState.cities))
    localStorage.setItem('favorites', JSON.stringify(nextState.favorites))
  }

  componentDidUpdate() {
    setInterval(() => localStorage.clear(), minToMs(15))
  }

  addToFavorites(cityName) {
    let { favorites } = this.state

    this.setState({
      favorites: R.assoc(cityName, true, favorites),
    })
  }

  removeFromFavorites(cityName) {
    let { favorites } = this.state
    let favoritesCities = R.keys(favorites)

    this.setState({
      favorites: R.dissoc(favoritesCities[cityName], favorites),
    })
  }
  render() {
    let { cities, favorites } = this.state

    return (
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <Start
                loadCities={this.loadCities}
                addToFavorites={this.addToFavorites}
                cities={cities}
                favorites={favorites}
              />
            )}
          />

          <Route
            path="/favorites"
            render={() => (
              <Favorites
                favorites={favorites}
                cities={cities}
                removeFromFavorites={this.removeFromFavorites}
              />
            )}
          />

          <Route
            path={'/weather/:id'}
            render={({ match }) => <Forecast id={match.params.id} />}
          />
        </Switch>
      </div>
    )
  }
}
export default Root

import React from 'react'
import autoBind from 'auto-bind'
import { Route, NavLink, Switch } from 'react-router-dom'
import StartContainer from '../../containers/StartContainer'
import FavoritesContainer from '../../containers/FavoritesContainer'
import ForecastContainer from '../../containers/ForecastContainer'
import './Root.css'
import { minToMs } from '../../helpers/helpers'
import { BrowserRouter } from 'react-router-dom'

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
  }

  componentWillMount() {
    this.setState({
      cities: JSON.parse(localStorage.getItem('cities')),
      favorites: JSON.parse(localStorage.getItem('favorites')),
    })
  }

  componentWillUpdate(_, nextState) {
    localStorage.setItem('cities', JSON.stringify(nextState.cities))
    localStorage.setItem('favorites', JSON.stringify(nextState.favorites))
  }

  componentDidUpdate() {
    setInterval(() => localStorage.clear(), minToMs(15))
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={StartContainer} />

            <Route path="/favorites" component={FavoritesContainer} />

            <Route path={'/weather/:id'} component={ForecastContainer} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}
export default Root

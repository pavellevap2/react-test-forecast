import React from 'react'
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
  }

  componentDidMount() {
    this.props.loadFavorites()
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

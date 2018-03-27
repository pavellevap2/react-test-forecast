import React from 'react'
import { Route, Switch } from 'react-router-dom'
import StartContainer from '../containers/StartContainer'
import FavoritesContainer from '../containers/FavoritesContainer'
import ForecastContainer from '../containers/ForecastContainer'
import Header from './Header'
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

injectGlobal`
  body{
    padding: 0;
    margin: 0;
  }
  
  li{
    list-style: none;
  }
  
  a{
    text-decoration: none;
  }
`

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

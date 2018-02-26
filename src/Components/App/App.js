import React from "react";
import {BrowserRouter,Route ,NavLink, Switch} from "react-router-dom";
import StartPage from "../StartPage/StartPage";
import Favorites from "../FavoritesPage/FavoritesPage"

const Header = () => {
  return(
      <header>
          <ul>
              <li><NavLink to="/">Поиск</NavLink></li>
              <li><NavLink to="/favorites">Избранное</NavLink></li>
          </ul>
      </header>
  )
};


let App = () => {
    return(
        <div>
            <Header/>
            <Switch>
                <Route exact path="/" component={StartPage}/>
                <Route path ="/favorites" component={Favorites} />
            </Switch>
        </div>
    )
};
export default App;
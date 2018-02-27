import React from "react";
import ReactDOM from "react-dom";import {BrowserRouter,Route ,NavLink, Switch} from "react-router-dom";
import StartPage from "../Start/Start";
import Favorites from "../Favorites/Favorites";
import "./Root.css";

const Header = () => {
  return(
      <header>
          <ul>
              <li><NavLink exact to="/">Поиск</NavLink></li>
              <li><NavLink to="/favorites">Избранное</NavLink></li>
          </ul>
      </header>
  )
};


let Root = () => {
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

export default Root;
import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter,Route ,NavLink, Switch} from "react-router-dom";
import Root from "./Components/Root/Root";

ReactDOM.render(
    <BrowserRouter>
        <Root />
    </BrowserRouter>,
    document.getElementById("root"));

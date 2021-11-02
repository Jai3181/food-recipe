import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute2 = ({ component: Component, ...rest }) => {
  return <Route {...rest} component={(props) => {
    const foodTarget = localStorage.getItem("foodTarget")
    if (foodTarget) {
      return <Component {...props} />
    }
    else {
      return <Redirect to="/" exact />
    }
  }} />
}

export default PrivateRoute2
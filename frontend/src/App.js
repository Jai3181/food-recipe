import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom"
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateRecipe from './pages/CreateRecipe';
import ViewRecipe from './pages/ViewRecipe';
import PrivateRoute from './components/HOC/PrivateRoute';
import PrivateRoute2 from './components/HOC/PrivateRoute2';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from "./actions/Actions"

function App() {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn())
    }
  }, [])
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact component={Home} />
        <PrivateRoute path="/newRecipe" exact component={CreateRecipe} />
        <PrivateRoute2 path="/viewRecipe" exact component={ViewRecipe} />
        <Route path="/signin" component={SignIn} />
        <Route path="/signup" component={SignUp} />
      </Switch>
    </div>
  );
}

export default App;

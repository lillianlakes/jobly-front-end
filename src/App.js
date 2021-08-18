import React, {useState} from "react";
import { Route, Switch, Redirect, BrowserRouter, NavLink} from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import './App.css';

function App() {
  // make request to API to log in and get a token - we'll get a user here somewhere (handwave)
  // define function and pass logInlogOut function to forms
  // state for current user
  // state for isLoggedIn buttttttt maybe don't need it if we have a user because we could just say if user
  // and/or other things
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes />
      </BrowserRouter> 
    </div>
  );
}

export default App;


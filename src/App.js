import React, {useState} from "react";
import { Route, Switch, Redirect, BrowserRouter, NavLink} from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import UserContext from "./UserContext";
import './App.css';

function App() {

  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  // make request to API to log in and get a token - we'll get a user here somewhere (handwave)
  // define function and pass logInlogOut function to forms
  // state for current user
  // state for isLoggedIn buttttttt maybe don't need it if we have a user because we could just say if user
  // and/or other things

  /* Hint on Proceeding — Read After Thinking!

  Here’s the strategy we took from our solution:
  
  Make login, signup, and logout functions in the App component.

  function login() {

  }

  function signup() {

  }

  function logout() {

  }
  
  useEffect(function getUserToken() {


    
  }, [currentUser]);



  By passing login, logout, and signup functions down to the login and signup forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.
  
  Add token as a piece of state in App, along with state for the currentUser.
  
  Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.
  
  Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.
  
  This would be an excellent place to use useContext, so you can store the current user’s info high up in your hierarchy, like on the App component.
 */



  return (
    <div className="App">
      <BrowserRouter>
        <NavBar /> 
        <Routes />
      </BrowserRouter> 
      <UserContext.Provider value={ user }></UserContext.Provider>
    </div>
  );
}

export default App;


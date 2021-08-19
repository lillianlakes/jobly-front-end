import React, {useState, useEffect} from "react";
import { Route, Switch, Redirect, BrowserRouter, NavLink} from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import UserContext from "./UserContext"; //change this to lower case for the file name?
import './App.css';
import JoblyApi from "./api";
import jwt from "jsonwebtoken";

function App() {
// from check-in (put history.push into handle submit or something further down, but not here)

  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  // make request to API to log in and get a token - we'll get a user here somewhere (handwave)
  // define function and pass logInlogOut function to forms
  // state for current user
  // state for isLoggedIn buttttttt maybe don't need it if we have a user because we could just say if user
  // and/or other things

  /**  
   *   Makes API call to get the current user given a username and token.
   *   Sets the currentUser.
   */ 
   useEffect(function updateUserWithTokenChange() {
    async function getCurrentUser(token) {
      let { username } = jwt.decode(token);
    console.log(username, "USERNAME INSIDE APP LINE 26")
      let user = await JoblyApi.getCurrentUser(username, token);
      setCurrentUser(user);
    }
    if(token) getCurrentUser(token);
  }, [token]);

  /**  
   *   Makes API call to log in the current user given a username and password.
   *   Sets the token and gets the currentUser.
   */ 
  async function login({username, password}) {
    console.log({username, password}, "USERNAME/PW IN LOGIN APP.JS")
    let newToken = await JoblyApi.login(username, password);
    setToken(() => newToken);
  }

  /**  
   *   Makes API call to register a user given a username, password, firstName, 
   *   lastName and email.
   *   Sets the token and gets the currentUser.
   */ 
  async function register({username, password, firstName, lastName, email}) {
    let newToken = await JoblyApi.register(username, password, firstName, lastName, email);
    setToken(() => newToken);  
  }

  /**  
   *   Logs the currentUser out by resetting the token and currentUser to null.
   */ 
    function logout() {
      setCurrentUser(null);
      setToken(null);
    }

  /* Hint on Proceeding — Read After Thinking!

  Here’s the strategy we took from our solution:

  By passing login, logout, and register functions down to the login and register forms and the navigation bar, they’ll be able to call centralized functions to perform these processes.
  
  Add token as a piece of state in App, along with state for the currentUser.
  
  Create an effect triggered by a state change of the token: this should call the backend to get information on the newly-logged-in user and store it in the currentUser state.
  
  Expose the current user throughout the app with a context provider. This will make it easy to refer to the current app in navigation, on pages, and so on.
  
  This would be an excellent place to use useContext, so you can store the current user’s info high up in your hierarchy, like on the App component.
 */
console.log(currentUser, "FROM APP");

  return (
    <div className="App">
      <UserContext.Provider value={ currentUser }> 
      <BrowserRouter>
        <NavBar logout={logout} /> 
        <Routes login={login} register={register}/>
      </BrowserRouter> 
      </UserContext.Provider>
    </div>
  );
}

export default App;


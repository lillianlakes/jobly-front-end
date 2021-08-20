import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import UserContext from "./UserContext"; //change this to lower case for the file name??
import './App.css';
import JoblyApi from "./api";
import jwt from "jsonwebtoken"


// import useLocalStorage from "./hooks/useLocalStorage";
// when the page reloads, look in localStorage to see if there is a token there
/**
 *  App: 
 *  - Makes API calls to get the current user, stores the user's token, and sets the current user.
 *  - Current user is passed to other components via UserContext
 *  
 *  App -> [NavBar, Routes]
 * 
 */

function App() {
  // think about state like your application is "in this state" - like "i am currently fetching" or "all done" or "not started yet"
  
  const initialToken = JSON.parse(localStorage.getItem("token")) || null;  
  
  console.log(`initialToken `, initialToken);
  console.log(`typeof initialToken `, typeof initialToken);

  const [token, setToken] = useState(initialToken);
  // const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState("fetching"); // or could have a user, or an empty object, or set it to string like "waiting" or fetching
  // could add isLoggingIn
  console.log("App", token, currentUser)



  /**  
   *   Makes API call to get the current user given a username and token.
   *   Sets the currentUser.
   */
  useEffect(function updateUserWithTokenChange() {  // when we refresh, it renders, but there is no user yet
    console.log("App updateUserWithTokenChange", token)
    
    async function fetchCurrentUser(token) { // change this to fetch or update, not get - get would actually return the current user
      setCurrentUser("fetching");
      let { username } = jwt.decode(token);
      let user = await JoblyApi.getCurrentUser(username, token);
      setCurrentUser(user);
    }
    // if (currentUser === "fetching") return;
    if (token) fetchCurrentUser(token);
    if (!token) setCurrentUser({});
  }, [token]);

  /**  
   *   Makes API call to log in the current user given a username and password.
   *   Sets the token and gets the currentUser.
   */
  async function logIn({ username, password }) {
    let newToken = await JoblyApi.login(username, password);
    setToken(() => newToken); // never wrong to do it this way, but it's unnecessary to use the functional form here to set the token 
    // since the current state doesn't rely on the previous state.
    return localStorage.setItem("token", JSON.stringify(newToken));
  }

  /**  
   *   Makes API call to register a user given a username, password, firstName, 
   *   lastName and email.
   *   Sets the token and gets the currentUser.
   */
  async function register({ username, password, firstName, lastName, email }) {
    let newToken = await JoblyApi.register(username, password, firstName, lastName, email);
    setToken(() => newToken);
    return localStorage.setItem("token", JSON.stringify(newToken));
  }

  /**  
   *   Logs the currentUser out by resetting the token and currentUser to null.
   */
  function logOut() {
    //setCurrentUser(null); // might be better to do this inside useEffect, (if !token, set currentUser to null)
    setToken(null); // this would stay here, but the currentUsers could be grouped together
    return localStorage.setItem("token", JSON.stringify(null));
  }

  console.log("render ", currentUser, "FROM APP");

  console.log(`right before rendering app, localStorage `, localStorage);
  console.log(`typeof localStorage `, typeof localStorage);

  return (
    <div className="App">
      <UserContext.Provider value={currentUser}>
        <BrowserRouter>
          {currentUser === "fetching" && token === null?
            <i>loading...</i>
            :
            <div>
              <NavBar logOut={logOut} /> {/* capitalizing the in/out can help to clarify intent/purpose ---- here we don't want to send anyone anywhere while we are checking
          if statement: if someone is currently logging in, don't send them anywhere */}
              <Routes logIn={logIn} register={register} />
            </div> }
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;


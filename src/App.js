import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import NavBar from "./Navbar";
import UserContext from "./UserContext";
import './App.css';
import JoblyApi from "./api";
import jwt from "jsonwebtoken"

/**
 *  App: 
 *  - Makes API calls to get the current user, stores the user's token, and sets the current user.
 *  - Current user is passed to other components via UserContext
 *  
 *  App -> [NavBar, Routes]
 * 
 */

function App() {

  const initialToken = JSON.parse(localStorage.getItem("token")) || null;
  const [token, setToken] = useState(initialToken);
  const [currentUser, setCurrentUser] = useState("fetching"); // or could have a user, or an empty object, or set it to string like "waiting" or fetching
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [aiMeta, setAiMeta] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState(null);
  const [recommendationsRefreshKey, setRecommendationsRefreshKey] = useState(0);
  const currentUsername = currentUser && currentUser !== "fetching"
    ? currentUser.username
    : null;

  /**  
   *   Makes API call to get the current user given a username and token.
   *   Sets the currentUser.
   */
  useEffect(function updateUserWithTokenChange() {
    async function fetchCurrentUser(token) {
      setCurrentUser("fetching");

      try {
        let decodedToken = jwt.decode(token);
        if (!decodedToken?.username) throw new Error("Invalid token");

        let user = await JoblyApi.getCurrentUser(decodedToken.username, token);
        setCurrentUser(user);
      } catch {
        setToken(null);
        setCurrentUser({});
        localStorage.setItem("token", JSON.stringify(null));
      }
    }

    JoblyApi.token = token;

    if (token) fetchCurrentUser(token);
    if (!token) setCurrentUser({});
  }, [token]);

  useEffect(function loadAiRecommendations() {
    if (!currentUsername) {
      setAiRecommendations([]);
      setAiMeta(null);
      setAiError(null);
      setAiLoading(false);
      return;
    }

    async function fetchRecommendations() {
      setAiLoading(true);
      setAiError(null);

      try {
        const data = await JoblyApi.getAiRecommendations(currentUsername, 10);
        setAiRecommendations(data?.recommendations || []);
        setAiMeta(data?.meta || null);
      } catch (err) {
        const message = Array.isArray(err)
          ? err[0]
          : err?.message || "Could not load recommendations";
        setAiError(message);
        setAiRecommendations([]);
        setAiMeta(null);
      } finally {
        setAiLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentUsername, currentUser?.applications, recommendationsRefreshKey]);

  function refreshRecommendations() {
    setRecommendationsRefreshKey(key => key + 1);
  }

  /**  
   *   Makes API call to log in the current user given a username and password.
   *   Sets the token and gets the currentUser.
   */
  async function logIn({ username, password }) {
    let newToken = await JoblyApi.login(username, password);
    setToken(() => newToken);
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
    setToken(null);
    return localStorage.setItem("token", JSON.stringify(null));
  }

  return (
    <div className="App">
      <UserContext.Provider value={{
        currentUser,
        setCurrentUser,
        aiRecommendations,
        aiMeta,
        aiLoading,
        aiError,
        refreshRecommendations,
      }}>
        <BrowserRouter>
          {currentUser === "fetching" ?
            <i>loading...</i>
            :
            <div>
              <NavBar logOut={logOut} />
              <Routes logIn={logIn} register={register} />
            </div>}
        </BrowserRouter>
      </UserContext.Provider>
    </div>
  );
}

export default App;


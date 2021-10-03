import React, { useContext } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList.js";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";
import UserContext from "./UserContext";
import PrivateRoute from "./PrivateRoute";
import Applications from "./Applications";

/** Routes to different endpoints and redirects to home if an endpoint
 *  if not found. 
 *  Private Routes check for a current user - see PrivateRoute.js
 */
function Routes({ logIn, register }) {
    const { currentUser } = useContext(UserContext);
    console.log("Routes: currentUser", currentUser);
    return (
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <PrivateRoute exact path="/companies" >
                <CompanyList />
            </PrivateRoute>
            <PrivateRoute exact path="/companies/jobs" >
                {<JobList />}
            </PrivateRoute>
            <PrivateRoute exact path="/companies/:handle" >
                {<CompanyDetail />}
            </PrivateRoute>
            <Route exact path="/login" >
                <LoginForm logIn={logIn} />
            </Route>
            <Route exact path="/signup" >
                <SignupForm register={register} />
            </Route>
            <PrivateRoute exact path="/profile" >
                <ProfileForm />
            </PrivateRoute>
            <PrivateRoute exact path="/applications" >
                <Applications />
            </PrivateRoute>
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;
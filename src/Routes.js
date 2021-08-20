import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList.js";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";

/** Routes to different endpoints and redirects to home if an endpoint
 *  if not found
 */
function Routes({ logIn, register }) {
    return (
        <Switch>
            <Route exact path="/" >
                <Home />
            </Route>
            <Route exact path="/companies" >
                <CompanyList />
            </Route>
            <Route exact path="/companies/jobs" >
                <JobList />
            </Route>
            <Route exact path="/companies/:handle" >
                <CompanyDetail />
            </Route>
            <Route exact path="/login" >
                <LoginForm logIn={logIn} />
            </Route>
            <Route exact path="/signup" >
                <SignupForm register={register} />
            </Route>
            <Route exact path="/profile" >
                <ProfileForm />
            </Route>
            {/* <Route><NotFound /></Route> */}
            <Redirect to="/" />
        </Switch>
    )
}

export default Routes;
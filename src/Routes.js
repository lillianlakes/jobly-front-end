import React, {useState} from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import CompanyList from "./CompanyList.js";
import CompanyDetail from "./CompanyDetail";
import JobList from "./JobList";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import ProfileForm from "./ProfileForm";


function Routes() {
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
                    <LoginForm /> {/** pass the logInLogOut function down here from App & in ohter forms */ }
                </Route>
                <Route exact path="/signup" >
                    <SignupForm />
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
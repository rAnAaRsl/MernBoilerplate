import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from "./actions/authAction";
import {clearCurrentProfile} from "./actions/profileActions";
import store from './store';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials.js/AddExperience';
import PrivateRoute from './components/common/PrivateRoute';

// Check for Token

if(localStorage.jwtToken)
{
    // Set auth token header auth
    setAuthToken(localStorage.jwtToken);

    // Decode token and get User Info and exp

    const decode = jwt_decode(localStorage.jwtToken);

    // Set User and is Authenticated

    store.dispatch(setCurrentUser(decode));

    // Check for Expired token

    const currentTime = Date.now()/1000;
    if(decode.exp<currentTime)
    {
        // Logout User

        store.dispatch(logoutUser());


        // Clear Profile

        store.dispatch(clearCurrentProfile());


        // Redirect to login

        window.locale.href ='/login';
    }
}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <Navbar/>
                        <Route exact path={"/"} component={Landing}/>
                        <div className={"container"}>
                            <Route exact path={"/register"} component={Register}/>
                            <Route exact path={"/login"} component={Login}/>
                            <Switch>
                            <PrivateRoute exact path={"/dashboard"} component={Dashboard}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path={"/create-profile"} component={CreateProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path={"/edit-profile"} component={EditProfile}/>
                            </Switch>
                            <Switch>
                                <PrivateRoute exact path={"/add-experience"} component={AddExperience}/>
                            </Switch>
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

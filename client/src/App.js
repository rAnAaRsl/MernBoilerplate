import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from "./actions/authAction";
import store from './store';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/footer';
import Landing from './components/layout/landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';


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

        // TODO: Clear current Profile
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
                        </div>
                        <Footer/>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;

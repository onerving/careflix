import React, { Component } from 'react';
import axios from 'axios';
import RegisterForm from './RegisterForm';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import Browse from './Browse';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <h2>Bienvenido a Careflix</h2>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/secret" component={Browse} />
                </div>
            </Router>
        );
    }
}

export default App;

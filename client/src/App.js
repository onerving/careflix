import React, { Component } from 'react';
import RegisterForm from './landing/RegisterForm';
import LandingPage from './landing/LandingPage';
import LoginForm from './landing/LoginForm';
import Browse from './browsing/Browse';
import History from './History';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {Container} from 'semantic-ui-react'
import withAuth from "./withAuth";
import VideoBrowser from "./watching/VideoBrowser";
import styled from "styled-components";
import UploadVideo from "./admin/UploadVideo";

class App extends Component {
    render() {
        const MainContainer = styled(Container)`
            padding: 2em;
            background-color: #F5F5F5;
            height: 100%;
            min-height: 100%;
        `;

        return (
            <MainContainer fluid>
                <Router flex>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/register" component={RegisterForm} />
                    <Route path="/login" component={LoginForm} />
                    <Route path="/watch/:videoId" component={withAuth(VideoBrowser)} />
                    <Route path="/browse" component={withAuth(Browse)} />
                    <Route path="/upload" component={withAuth(UploadVideo)} />
                    <Route path="/history" component={withAuth(History)} />
                </Router>
            </MainContainer>
        );
    }
}

export default App;

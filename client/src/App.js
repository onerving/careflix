import React, { Component } from 'react';
import RegisterForm from './landing/RegisterForm';
import LandingPage from './landing/LandingPage';
import LoginForm from './landing/LoginForm';
import Browse from './browsing/Browse';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Container, Grid, Header} from 'semantic-ui-react'
import withAuth from "./withAuth";
import VideoBrowser from "./watching/VideoBrowser";

class App extends Component {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <Grid container style={{
                padding: '2em 0em'
            }}>
                <Grid.Row>
                    <Grid.Column>
                        <Header as='h1' dividing>
                            Careflix
                        </Header>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Router>
                        <Container>
                            <Route exact path="/" component={LandingPage} />
                            <Route path="/register" component={RegisterForm} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/watch/:videoId" component={withAuth(VideoBrowser)} />
                            <Grid.Row>
                                <Route path="/browse" component={withAuth(Browse)} />
                            </Grid.Row>
                        </Container>
                    </Router>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;

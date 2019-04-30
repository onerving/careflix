import React, { Component } from 'react';
import RegisterForm from './landing/RegisterForm';
import LandingPage from './landing/LandingPage';
import LoginForm from './landing/LoginForm';
import Browse from './browsing/Browse';
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import {Container, Grid, Header, Segment} from 'semantic-ui-react'
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
                padding: '2em 0em',
            }}>
                <Grid.Row>
                    <Grid.Column>
                        <Segment  color={'blue'}>
                            <Header as='h1' >
                                Careflix
                            </Header>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Router>
                        <Container>
                            <Route exact path="/" component={LandingPage} />
                            <Route path="/register" component={RegisterForm} />
                            <Route path="/login" component={LoginForm} />
                            <Route path="/watch/:videoId" component={withAuth(VideoBrowser)} />
                            <Route path="/browse" component={withAuth(Browse)} />
                            <div></div>
                        </Container>
                    </Router>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;

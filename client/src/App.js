import React, { Component } from 'react';
import RegisterForm from './RegisterForm';
import LandingPage from './LandingPage';
import LoginForm from './LoginForm';
import Browse from './Browse';
import { BrowserRouter as Router, Route} from "react-router-dom";
import {Container, Grid, Header} from 'semantic-ui-react'
import withAuth from "./withAuth";

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
                            <Route path="/browse" component={withAuth(Browse)} />
                        </Container>
                    </Router>
                </Grid.Row>
            </Grid>
        );
    }
}

export default App;

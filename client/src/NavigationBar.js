import React, {Component} from 'react';
import {Grid, Header, Container} from "semantic-ui-react";


class NavigationBar extends Component {
    render() {
        return (
            <Grid.Row>
                <Grid.Column floated={'left'}>
                    <Container>
                        <Header as='h1' >
                            Careflix
                        </Header>
                    </Container>
                </Grid.Column>
                <Grid.Column floated={'right'}>
                </Grid.Column>
            </Grid.Row>
        );
    }
}

export default NavigationBar;
import React, { Component } from "react";
import {Button, Grid, Header, Image, Segment} from "semantic-ui-react";
import { Link } from 'react-router-dom'
import landing from './img/landing.jpeg'

class LandingPage extends Component{
    render(){
        return(
            <Segment>
                <Grid textAlign='left' verticalAlign='middle'>
                    <Grid.Column width={6}>
                        <Image src={landing} flow rounded />
                    </Grid.Column>
                    <Grid.Column width={6}>
                        <Grid.Row style={{'padding-bottom': '5em'}}>
                            <Header as='h1' style={{'font-size': '5em'}}>
                                Careflix
                                <Header.Subheader>Los mejores videos de temas médicos, accesibles en segundos.</Header.Subheader>
                            </Header>
                        </Grid.Row>
                        <Grid.Row>
                            <Link to='/register'>
                                <Button primary> Regístrate </Button>
                            </Link>
                            <Link to='/login'>
                                <Button basic> Inicia sesión </Button>
                            </Link>
                        </Grid.Row>

                    </Grid.Column>
                </Grid>
            </Segment>
        )


    }

}
export default LandingPage;